var assert = require("chai").assert;
const { GenericContainer } = require("testcontainers");
const { Client } = require('@elastic/elasticsearch')

let esClient;

describe("Kibana Funcional Tests", function() {
  this.beforeAll(async () => {
    console.log("Before ALL");
  });

  this.afterAll(async () => {
    console.log("After ALL");
  });

  describe("APM UI", function() {
    describe("With Elasticsearch", async () => {
      let container;

      this.beforeAll(async () => {
        container = await new GenericContainer(
          "docker.elastic.co/elasticsearch/elasticsearch",
          "7.2.0"
        )
          .withExposedPorts(9200)
          .withEnv("bootstrap.memory_lock", "true")
          .withEnv("discovery.type", "single-node")
          .withEnv("ES_JAVA_OPTS", "-Xms512m -Xmx512m")
          .withEnv("xpack.security.enabled", "false")
          .start();

        esClient = new Client({
          node: "http://127.0.0.1:" + container.getMappedPort(9200)
        });

        await indexGoT("Ned Stark", "Winter is coming");
        await indexGoT("Daenerys Targaryen", "Dracarys!");
        await indexGoT(
          "Tyrion Lannister",
          "A mind needs books like a sword needs a whetstone."
        );

        await esClient.indices.refresh({ index: "game-of-thrones" });
      });

      this.afterAll(async () => {
        await container.stop();
      });

      it("We can retrieve entries from Elasticsearch", async () => {
        const { body } = await esClient.search({
          index: "game-of-thrones",
          body: {
            query: {
              match: { quote: "winter" }
            }
          }
        });

        assert.equal(body.hits.hits.length, 1, 'Sorry, but Joffrey killed Ned :(');
      });
    });
  });
});

async function indexGoT(character, quote) {
  await esClient.index({
    index: "game-of-thrones",
    body: {
      character: character,
      quote: quote
    }
  });
}
