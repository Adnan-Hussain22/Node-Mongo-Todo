const apiEndpoint = "http://localhost:5001";
const fetchAllTask = async () => {
  try {
    const res = await fetch(`${apiEndpoint}/`);
    const json = await res.json();
    return json;
  } catch (err) {
    return { status: false, message: `Unable to get tasks` };
  }
};

const fetchTaskSpecific = async id => {
  try {
    if (!id && typeof id != "string") {
      return { status: false, message: "id must be string" };
    }
    const res = await fetch(`${apiEndpoint}/${id}`);
    const json = await res.json();
    return json;
  } catch (err) {
    return { message: `Unable to get a task` };
  }
};

const addTask = async body => {
  try {
    const res = await fetch(`${apiEndpoint}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const json = await res.json();
    return json;
  } catch (err) {
    return { message: `Unable to add task` };
  }
};

const updateTask = async (id, body) => {
  try {
    if (!id && typeof id != "string") {
      return { status: false, message: "id must be string" };
    }
    const res = await fetch(`${apiEndpoint}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const json = await res.json();
    return json;
  } catch (err) {
    return { message: `Unable to get todos` };
  }
};

const updateTaskStatus = async (id, status) => {
  try {
    if (!id && typeof id != "string") {
      return { status: false, message: "id must be string" };
    }
    const res = await fetch(`${apiEndpoint}/status/${id}/${status}`, {
      method: "PUT"
    });
    const json = await res.json();
    return json;
  } catch (err) {
    return { message: `Unable to get todos`, status: false };
  }
};

const deleteTask = async id => {
  console.log('deleteTask')
  try {
    if (!id && typeof id != "string") {
      return { status: false, message: "id must be string" };
    }
    const res = await fetch(`${apiEndpoint}/${id}`, {
      method: "DELETE"
    });
    const json = await res.json();
    return json;
  } catch (err) {
    return { message: `Unable to get todos` };
  }
};

export {
  addTask,
  updateTask,
  deleteTask,
  fetchTaskSpecific,
  fetchAllTask,
  updateTaskStatus
};
