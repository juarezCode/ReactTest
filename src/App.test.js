// import { render, screen } from "@testing-library/react";
import React from "react";
import App from "./App";
import { configure, shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { useTodos } from "./hooks/useTodos";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";

configure({ adapter: new Adapter() });

describe("App", () => {
  describe("Todo", () => {
    it("ejecute completeTodo on click", () => {
      const completeTodo = jest.fn();
      const removeTodo = jest.fn();
      const index = 5;
      const todo = {
        isCompleted: true,
        text: "todo1",
      };
      const wrapper = shallow(
        <Todo
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          index={index}
          todo={todo}
        />
      );

      wrapper.find("button").at(0).simulate("click");

      expect(completeTodo.mock.calls).toEqual([[5]]);
      expect(removeTodo.mock.calls).toEqual([]);
    });

    it("ejecute removeTodo on click", () => {
      const completeTodo = jest.fn();
      const removeTodo = jest.fn();
      const index = 5;
      const todo = {
        isCompleted: true,
        text: "todo1",
      };
      const wrapper = shallow(
        <Todo
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          index={index}
          todo={todo}
        />
      );

      wrapper.find("button").at(1).simulate("click");

      expect(removeTodo.mock.calls).toEqual([[5]]);
      expect(completeTodo.mock.calls).toEqual([]);
    });
  });

  describe("TodoForm", () => {
    it("call addTodo when form has any value", () => {
      const addTodo = jest.fn();
      const prevent = jest.fn();
      const wrapper = shallow(<TodoForm addTodo={addTodo} />);

      wrapper
        .find("input")
        .simulate("change", { target: { value: "newTodo" } });

      wrapper.find("form").simulate("submit", { preventDefault: prevent });

      expect(addTodo.mock.calls).toEqual([["newTodo"]]);
      expect(prevent.mock.calls).toEqual([[]]);
    });
  });

  describe("custom hooks: useTodos", () => {
    it("addTodo", () => {
      const TestComponent = (props) => {
        const hook = props.hook();
        return <div {...hook}></div>;
      };
      const wrapper = shallow(<TestComponent hook={useTodos} />);

      let props = wrapper.find("div").props();
      props.addTodo("testText");
      props = wrapper.find("div").props();
      expect(props.todos[0]).toEqual({ text: "testText" });
    });

    it("completeTodo", () => {
      const TestComponent = (props) => {
        const hook = props.hook();
        return <div {...hook}></div>;
      };
      const wrapper = shallow(<TestComponent hook={useTodos} />);

      let props = wrapper.find("div").props();
      props.completeTodo(0);
      props = wrapper.find("div").props();
      expect(props.todos[0].isCompleted).toEqual(true);
    });

    it("removeTodo", () => {
      const TestComponent = (props) => {
        const hook = props.hook();
        return <div {...hook}></div>;
      };
      const wrapper = shallow(<TestComponent hook={useTodos} />);

      let props = wrapper.find("div").props();
      props.removeTodo("Todo 1");
      props = wrapper.find("div").props();
      expect(props.todos.length).toEqual(2);
    });
  });

  describe("App component", () => {
    it("App", () => {
      const wrapper = mount(<App />);
      const prevent = jest.fn();

      wrapper.find("input").simulate("change", { target: { value: "myTodo" } });

      wrapper.find("form").simulate("submit", { preventDefault: prevent });

      // find by className .todo
      // find by id #todo
      const hasNewTodo = wrapper.find(".todo").at(0).text().includes("myTodo");

      expect(hasNewTodo).toEqual(true);
      expect(prevent.mock.calls).toEqual([[]]);
    });
  });
});
