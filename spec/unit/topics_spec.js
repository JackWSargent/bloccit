const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {
    beforeEach((done) => {
        this.topic;
        this.post;
        sequelize.sync({force: true}).then((res) => {
          Topic.create({
            title: "Expeditions to Alpha Centauri",
            description: "A compilation of reports from recent visits to the star system."
          })
          .then((topic) => {
            this.topic = topic;
            Post.create({
              title: "This place called the Alpha Centauri is huge",
              body: "I climbed on some boulders also know as rocks.",
              topicId: this.topic.id
            })
            .then((post) => {
              this.post = post;
              done();
            });
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        });
      });
      describe("#create()", () => {
        it("should create a topic object with a title and a description", (done) => {
          Topic.create({
            title: "Applejacks are the best",
            description: "Apple and cinnamon cereal is better than oreo cereal"
          })
          .then((topic) => {
            expect(topic.title).toBe("Applejacks are the best");
            expect(topic.description).toBe("Apple and cinnamon cereal is better than oreo cereal");
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        });
        it("should not create a topic with missing description of the topic", (done) => {
            Topic.create({
              title: "Applejacks are the best"
            })
            .then((topic) => {
              done();
            })
            .catch((err) => {
              expect(err.message).toContain("Topic.description cannot be null");
              done();
            })
          });
      });

      describe("#getPosts()", () => {
        it("should find associated posts of a certain topic", (done) => {
          this.topic.getPosts()
          .then((posts) => {
            expect(posts[0].topicId).toBe(this.topic.id);
            expect(posts[0].title).toBe("This place called the Alpha Centauri is huge");
            expect(posts[0].body).toBe("I climbed on some boulders also know as rocks.");
            done();
          })
        });
      });
})