import React, { Component } from "react";
import Modal from "react-responsive-modal";
import { server } from "../Helper";
import swal from "sweetalert";
import "../App.css";
class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      title: "",
      description: "",
      doneStatus: false,
      open: false,
      updateTitle: "",
      updateDescription: "",
      updateDoneStatus: false
    };
  }

  async componentDidMount() {
    try {
      const res = await server.fetchAllTask();
      if (res.status) {
        this.setState({
          todos: this.state.todos.concat([...res.data])
        });
      }
    } catch (err) {}
  }

  handleAddTask = async e => {
    e.preventDefault();
    const todoObject = {
      title: this.state.title,
      description: this.state.description
    };
    try {
      const res = await server.addTask(todoObject);
      if (res.status) {
        this.setState({
          todos: this.state.todos.concat({ ...res.data }),
          title: "",
          description: "",
          doneStatus: false
        });
        return;
      }
      console.log("Unable to add todo");
    } catch (err) {
      console.log(err);
    }
  };

  handleDeleteRequest = async todoId => {
    try {
      const res = await server.deleteTask(todoId);
      console.log(res);
      if (res.status) {
        this.setState({
          todos: [...res.data],
          title: "",
          description: "",
          doneStatus: false
        });
        swal("Wohaaa!", "Your task has been deleted", "success");
        return;
      }
      console.log("Unable to delete todo");
    } catch (err) {
      console.log(err);
    }
  };

  handleUpdateRequest = async e => {
    e.preventDefault();
    try {
      const id = localStorage.getItem("updatedTodoId");
      const todoObject = {
        title: this.state.updateTitle,
        description: this.state.updateDescription
      };
      const res = await server.updateTask(id, todoObject);
      if (res.status) {
        console.log("handleUpdateRequest==>", res);
        const todos = this.state.todos.filter(o => o._id != id);
        console.log("todos==>", todos);
        this.setState({
          todos: todos.concat({ ...res.data }),
          title: "",
          description: ""
        });
        this.onCloseModal();
        swal("Wohaaa!", "Your task has been updated", "success");
        return;
      }
      console.log("Unable to update todo");
    } catch (err) {
      console.log(err);
    }
  };
  handleTaskdone = async todo => {
    try {
      const res = await server.updateTaskStatus(todo._id, !todo.status);
      if (res.status) {
        const newTodoList = this.state.todos.filter(o => o._id != todo._id);
        this.setState({
          todos: [res.data, ...newTodoList]
        });
        if (res.data.status) swal("Wohamiii!", "Your task done!", "success");
      } else swal("Oops!", "Unable to update the task!", "error");
    } catch (err) {
      console.log(err);
    }
  };

  onOpenModal = id => {
    this.setState({ open: true });
    localStorage.setItem("updatedTodoId", id);
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-8 col-sm-12" id="form-container">
              <h2 className="text-center" id="addTaskHeadline">
                {" "}
                <i className="fas fa-pencil-alt" /> Add your task
              </h2>
              <form onSubmit={this.handleAddTask} className="p-3">
                <input
                  type="text"
                  placeholder="Title"
                  required
                  className="form-control"
                  value={this.state.title}
                  onChange={e => this.setState({ title: e.target.value })}
                />
                <br />
                <textarea
                  placeholder="Description"
                  required
                  className="form-control"
                  value={this.state.description}
                  onChange={e => this.setState({ description: e.target.value })}
                />
                <br />
                <button
                  type={"Submit"}
                  className="btn cstmBtn btn-block btn-lg"
                >
                  {" "}
                  <i className="fa fa-plus" /> Add Task
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Add task form completed here */}

        {/* Other apps */}

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-10 col-sm-12">
              {this.state.todos.map((todo, index) => {
                console.log("todo==>", todo);
                if (!todo.status) {
                  return (
                    <div className="card my-5" key={index}>
                      <div className="card-body">
                        <h3 className="todotext">{todo.title}</h3>
                        <p className="todotext">{todo.description}</p>
                        <div className="btn-group float-right">
                          <button
                            onClick={() => this.handleTaskdone(todo)}
                            className="btn btn-outline-success btn-lg card_btns"
                          >
                            {" "}
                            <i className="fa fa-check" />{" "}
                          </button>
                          <button
                            onClick={() => this.onOpenModal(todo._id)}
                            className="btn btn-outline-warning btn-lg card_btns"
                          >
                            {" "}
                            <i className="fas fa-pencil-alt" />{" "}
                          </button>
                          {}
                          <button
                            onClick={() => this.handleDeleteRequest(todo._id)}
                            className="btn btn-outline-danger btn-lg card_btns"
                          >
                            {" "}
                            <i className="fa fa-trash" />{" "}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="card my-5 doneBody" key={index}>
                      <div className="card-body">
                        <h3 className="todotext crossed">{todo.title}</h3>
                        <p className="todotext crossed">{todo.description}</p>
                        <div className="btn-group float-right">
                          <button
                            onClick={() => this.handleTaskdone(todo)}
                            className="btn btn-outline-warning btn-lg card_btns"
                          >
                            {" "}
                            <i className="fas fa-undo" />{" "}
                          </button>

                          <button
                            onClick={() => this.handleDeleteRequest(todo._id)}
                            className="btn btn-outline-danger btn-lg card_btns"
                          >
                            {" "}
                            <i className="fa fa-trash" />{" "}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>

        {/* MODAL FOR TODO */}

        <Modal open={open} onClose={this.onCloseModal} center>
          <h2 className="text-center my-2 pt-2">Update Todo</h2>
          <form onSubmit={this.handleUpdateRequest}>
            <input
              type="text"
              placeholder="Title"
              required
              className="form-control"
              onChange={e => this.setState({ updateTitle: e.target.value })}
            />
            <br />
            <br />
            <textarea
              placeholder="Description"
              required
              className="form-control"
              onChange={e =>
                this.setState({ updateDescription: e.target.value })
              }
            />
            <br />
            <br />
            <button className="btn btn-primary btn-block" type={"Submit"}>
              Update
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default AppContainer;
