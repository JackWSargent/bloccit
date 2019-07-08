const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Flair = require("../../src/db/models").Flair;

describe("Flair", () => {

  beforeEach((done) => {
    this.topic;
    this.flair;
    sequelize.sync({force: true}).then((res) => {
      Topic.create({
        title: "Long road down to the mountains",
        description: "A description of what to look for on your trip to the white mountains."
      })
      .then((topic) => {
        this.topic = topic;
        Flair.create({
          name: "Unread",
          color: "Blue",
          topicId: this.topic.id
        })
        .then((flair) => {
          this.flair = flair;
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
    it("should create a Flair object with a name, color, and assigned topic", (done) => {
      Flair.create({
        name: "Good",
        color: "Green",
        topicId: this.topic.id
      })
      .then((flair) => {
        expect(flair.name).toBe("Good");
        expect(flair.color).toBe("Green");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
    it("should not create a Flair with missing name, color, or assigned topic", (done) => {
        Flair.create({
          name: "Unread"
        })
        .then((Flair) => {
          done();
        })
        .catch((err) => {
          expect(err.message).toContain("Flair.color cannot be null");
          done();
        })
      });
  });
  describe("#setTopic()", () => {
    it("should associate a topic and a Flair together", (done) => {
      Topic.create({
        title: "Why in and out is the best",
        description: "It has amazing burgers"
      })
      .then((newTopic) => {
        expect(this.flair.topicId).toBe(this.topic.id);
        this.flair.setTopic(newTopic)
        .then((flair) => {
          expect(flair.topicId).toBe(newTopic.id);
          done();
        });
      })
    });

  });
});