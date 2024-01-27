import request from "supertest";
import app from "../index";
import { config } from "dotenv";
config();
let taskId = "";
const createTaskObj = {
  title: "Title 3",
  description: "Title 3 Description",
  status: "Pending",
  dueDate: "2024-01-27T20:11:00.678Z",
};
const updateTaskObj = {
  title: "Title 1 Updated",
  description: "Title 1 Description",
  status: "Pending",
};
const token = `Bearer ${process.env.SAMPLE_AUTH_TOKEN}`;

describe("task", () => {
  describe("auth", () => {
    const email = `guest${Math.floor(Math.random() * 1000) + 1}@gmail.com`;
    const password = "Guest@123";
    describe("register", () => {
      it("should create a new user and return status code 200", async () => {
        const res = await request(app).post("/auth/signup").send({
          email: email,
          userName: "guest",
          password: password,
        });
        expect(res.statusCode).toEqual(200);
      });
    });

    describe("login", () => {
      it("should return a token with status code 200", async () => {
        const res = await request(app).post("/auth/login").send({
          email: email,
          password: password,
        });
        expect(res.statusCode).toEqual(200);
      });

      it("should return 400 if user already exists", async () => {
        const res = await request(app).post("/auth/login").send({
          email: "notaguest@gmail.com",
          password: "guest",
        });
        expect(res.statusCode).toEqual(400);
      });
    });
  });

  describe("get tasks route", () => {
    describe("gets all tasks ", () => {
      it("should return all tasks with 200 as status code ", async () => {
        const res = await request(app)
          .get("/tasks/tasks")
          .set("Authorization", token);
        expect(res.statusCode).toEqual(200);
      });
    });
  });

  describe("create task route", () => {
    describe("create task", () => {
      it("should create task with 200 as status code ", async () => {
        const res: any = await request(app)
          .post("/tasks/task")
          .send(createTaskObj)
          .set("Authorization", token);
        console.log("data", res._body.data._id);
        taskId = res._body.data._id;
        expect(res.statusCode).toEqual(200);
      });
    });
  });

  describe("update tasks route", () => {
    describe("update task", () => {
      it("should update task with 200 as status code ", async () => {
        const res = await request(app)
          .patch(`/tasks/task/${taskId}`)
          .send(updateTaskObj)
          .set("Authorization", token);
        expect(res.statusCode).toEqual(200);
      });

      it("return 400 if wrong id is provided ", async () => {
        const res = await request(app)
          .delete(`/tasks/task/1`)
          .set("Authorization", token);
        expect(res.statusCode).toEqual(400);
      });

      it("should update task status with 200 as status code ", async () => {
        const res = await request(app)
          .patch(`/tasks/status/${taskId}`)
          .send({
            status: "Completed",
          })
          .set("Authorization", token);
        expect(res.statusCode).toEqual(200);
      });

      it("return 400 if task is already completed", async () => {
        const res = await request(app)
          .patch(`/tasks/status/${taskId}`)
          .send({
            status: "Completed",
          })
          .set("Authorization", token);
        expect(res.statusCode).toEqual(400);
      });
    });
  });

  describe("delete task route", () => {
    describe("delete task", () => {
      it("should delete task with 200 as status code ", async () => {
        const res = await request(app)
          .delete(`/tasks/task/${taskId}`)
          .set("Authorization", token);
        expect(res.statusCode).toEqual(200);
      });

      it("return 400 if wrong id is provided ", async () => {
        const res = await request(app)
          .delete(`/tasks/task/1`)
          .set("Authorization", token);
        expect(res.statusCode).toEqual(400);
      });
    });
  });

  describe("get category types", () => {
    it("get category types with 200 status code", async () => {
      const res = await request(app)
        .get(`/tasks/categories`)
        .set("Authorization", token);
      expect(res.statusCode).toEqual(200);
    });
  });
});
