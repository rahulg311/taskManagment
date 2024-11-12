import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Form, 
  Button, 
  Badge,
  Modal 
} from 'react-bootstrap';
import { toast, ToastContainer } from "react-toastify";
import { Search, Edit2, Trash2 } from 'lucide-react';

const TaskManager = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Complete Project Documentation',
      description: 'Write technical documentation for the new feature',
      dueDate: '2024-11-20',
      priority: 'high',
      category: 'Documentation',
      status: 'in-progress',
     assignedTo: 'Rahul Gupta'
    }
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    category: '',
    status: 'pending',
    assignedTo: ''
  });

  // State for edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showAddTaskForm, setShowAddTaskForm] = useState(false); // Toggle form visibility

  const handleAddTask = () => {
    if (newTask.title) {
      setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
      toast.success("  Successfully  add the task");
      setNewTask({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
        category: '',
        status: 'pending', assignedTo: ''
      });
      setShowAddTaskForm(false)
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setShowEditModal(true);
  };

  const handleEditSave = () => {
    if (editingTask) {
      setTasks(tasks.map(task => 
        task.id === editingTask.id ? editingTask : task
      ));
      setShowEditModal(false);
      setEditingTask(null);
    }
  };

  const getPriorityVariant = (priority) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'primary';
      case 'pending': return 'warning';
      default: return 'secondary';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  return (
    <Container className="py-4">
    <ToastContainer/>
      <Row className="mb-4">
        <Col>
          <h1 className="display-4 mb-4">Task Dashboard</h1>
          
          {/* Search and Filter Section */}
          <Row className="mb-4">
            <Col md={8}>
              <Form.Group className="position-relative">
                <Form.Control
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </Form.Select>
            </Col>
          </Row>

     {/* Add Task Button */}
     <Button 
            variant="primary" 
            onClick={() => setShowAddTaskForm(!showAddTaskForm)}
            className="mb-4"
          >
            {showAddTaskForm ? 'Hide Add Task' : 'Add Task'}
          </Button>

          {/* New Task Form */}
          {showAddTaskForm && (
          <Card className="mb-4">
            <Card.Header>
              <Card.Title>Add New Task</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={12} className="mb-3">
                    <Form.Group>
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12} className="mb-3">
                    <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Due Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Priority</Form.Label>
                      <Form.Select
                        value={newTask.priority}
                        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        type="text"
                        value={newTask.category}
                        onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        value={newTask.status}
                        onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={12} className="mb-3">
                      <Form.Group>
                        <Form.Label>Assigned To</Form.Label>
                        <Form.Control
                          type="text"
                          value={newTask.assignedTo}
                          onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" onClick={handleAddTask} className="w-100">
                  Add Task
                </Button>
              </Form>
            </Card.Body>
          </Card> )}

          {/* Task List */}
          {filteredTasks.map(task => (
            <Card key={task.id} className="mb-3">
              <Card.Body>
                <Row>
                  <Col>
                    <h4>{task.title}</h4>
                    <p className="text-muted">{task.description}</p>
                    <div className="d-flex gap-3 flex-wrap">
                      <Badge bg="secondary">
                        Due: {task.dueDate}
                      </Badge>
                      <Badge bg="info">
                        {task.category || 'No Category'}
                      </Badge>
                      <Badge bg={getStatusVariant(task.status)}>
                        {task.status}
                      </Badge>
                      <Badge bg={getPriorityVariant(task.priority)}>
                        {task.priority}
                      </Badge>
                      <Badge bg="dark">
                        Assigned to: {task.assignedTo}
                      </Badge>
                    </div>
                  </Col>
                  <Col xs="auto">
                    <div className="d-flex gap-2">
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => handleEditClick(task)}
                      >
                        <Edit2 size={16} />
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                      
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>

      {/* Edit Task Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingTask && (
            <Form>
              <Row>
                <Col md={12} className="mb-3">
                  <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={editingTask.title}
                      onChange={(e) => setEditingTask({
                        ...editingTask,
                        title: e.target.value
                      })}
                    />
                  </Form.Group>
                </Col>
                <Col md={12} className="mb-3">
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={editingTask.description}
                      onChange={(e) => setEditingTask({
                        ...editingTask,
                        description: e.target.value
                      })}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={editingTask.dueDate}
                      onChange={(e) => setEditingTask({
                        ...editingTask,
                        dueDate: e.target.value
                      })}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label>Priority</Form.Label>
                    <Form.Select
                      value={editingTask.priority}
                      onChange={(e) => setEditingTask({
                        ...editingTask,
                        priority: e.target.value
                      })}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type="text"
                      value={editingTask.category}
                      onChange={(e) => setEditingTask({
                        ...editingTask,
                        category: e.target.value
                      })}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      value={editingTask.status}
                      onChange={(e) => setEditingTask({
                        ...editingTask,
                        status: e.target.value
                      })}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={12} className="mb-3">
                  <Form.Group>
                    <Form.Label>Assigned To</Form.Label>
                    <Form.Control
                      type="text"
                      value={editingTask.assignedTo}
                      onChange={(e) => setEditingTask({ ...editingTask, assignedTo: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TaskManager;