const projectsData = {
    "projects": [
      {
        "key": "project1",
        "name": "Project One",
        "topics": [
          {
            "number": "1",
            "name": "Topic A",
            "status": "Pending",
            "owners": [
              {
                "username": "user1",
                "title": "User One",
                "key": "user1key"
              }
            ]
          },
          {
            "number": "2",
            "name": "Topic B",
            "status": "In Progress",
            "owners": [
              {
                "username": "user2",
                "title": "User Two",
                "key": "user2key"
              },
              {
                "username": "user3",
                "title": "User Three",
                "key": "user3key"
              }
            ]
          }
        ]
      },
      {
        "key": "project2",
        "name": "Project Two",
        "topics": [
          {
            "number": "1",
            "name": "Topic X",
            "status": "Completed",
            "owners": [
              {
                "username": "user4",
                "title": "User Four",
                "key": "user4key"
              }
            ]
          }
        ]
      },
      {
        "key": "project3",
        "name": "Project Three",
        "topics": [
          {
            "number": "1",
            "name": "Topic P",
            "status": "Pending",
            "owners": [
              {
                "username": "user5",
                "title": "User Five",
                "key": "user5key"
              }
            ]
          },
          {
            "number": "2",
            "name": "Topic Q",
            "status": "In Progress",
            "owners": [
              {
                "username": "user6",
                "title": "User Six",
                "key": "user6key"
              },
              {
                "username": "user7",
                "title": "User Seven",
                "key": "user7key"
              }
            ]
          }
        ]
      }
    ]
  };
  
  // Function to populate project selection dropdown
  function populateProjectDropdown() {
    const projectSelect = document.getElementById('projectSelect');
    projectsData.projects.forEach(project => {
      const option = document.createElement('option');
      option.value = project.key;
      option.textContent = project.name;
      projectSelect.appendChild(option);
    });
  }
  
  // Function to update table when project is selected
  function updateTable(selectedProjectKey) {
    const selectedProject = projectsData.projects.find(project => project.key === selectedProjectKey);
    const topicTableBody = document.getElementById('topicTableBody');
    topicTableBody.innerHTML = '';
  
    selectedProject.topics.forEach(topic => {
      const row = topicTableBody.insertRow();
      row.insertCell().textContent = topic.number;
      row.insertCell().textContent = topic.name;
      row.insertCell().textContent = topic.status;
      row.insertCell().textContent = topic.owners.map(owner => owner.title).join(', ');
  
      const actionCell = row.insertCell();
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => openEditModal(topic));
      actionCell.appendChild(editButton);
    });
  }
  
  // Function to open edit modal for topic
  function openEditModal(topic) {
    const newStatus = prompt(`Edit Topic "${topic.name}"\nEnter new status:`);
    if (newStatus !== null) {
      if (newStatus !== topic.status) {
        updateTopicStatusAndSendEmail(topic, newStatus);
      }
      const newName = prompt(`Edit Topic Name "${topic.name}"\nEnter new name:`);
      if (newName !== null) {
        topic.name = newName;
        updateTable(projectSelect.value);
      }
    }
  }
  
  // Function to update topic status and send email
  function updateTopicStatusAndSendEmail(topic, newStatus) {
    const oldStatus = topic.status;
    topic.status = newStatus;
    sendEmailToOwners(topic, oldStatus);
  }
  
  // Function to send email to topic owners
  function sendEmailToOwners(topic, oldStatus) {
    topic.owners.forEach(owner => {
      console.log(`Sending email to ${owner.username} (${owner.title}): Topic "${topic.name}" status changed from "${oldStatus}" to "${topic.status}"`);
    });
  }
  
  // Call the function to populate the dropdown and handle project selection
  populateProjectDropdown();
  
  const projectSelect = document.getElementById('projectSelect');
  projectSelect.addEventListener('change', () => {
    const selectedProjectKey = projectSelect.value;
    updateTable(selectedProjectKey);
  });
  