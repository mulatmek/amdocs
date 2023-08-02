const projectsData = {
    "projects": [
      {
        "key": "amdocs_project1",
        "name": "Billing System Upgrade",
        "topics": [
          {
            "number": "1",
            "name": "Legacy System Analysis",
            "status": "Pending",
            "owners": [
              {
                "username": "john_doe",
                "title": "John Doe",
                "key": "john_doe_key"
              }
            ]
          },
          {
            "number": "2",
            "name": "Data Migration Plan",
            "status": "In Progress",
            "owners": [
              {
                "username": "alice_smith",
                "title": "Alice Smith",
                "key": "alice_smith_key"
              },
              {
                "username": "bob_jones",
                "title": "Bob Jones",
                "key": "bob_jones_key"
              }
            ]
          }
        ]
      },
      {
        "key": "amdocs_project2",
        "name": "Customer Experience Enhancement",
        "topics": [
          {
            "number": "1",
            "name": "User Interface Redesign",
            "status": "Completed",
            "owners": [
              {
                "username": "emily_rodriguez",
                "title": "Emily Rodriguez",
                "key": "emily_rodriguez_key"
              }
            ]
          }
        ]
      },
      {
        "key": "amdocs_project3",
        "name": "Network Performance Optimization",
        "topics": [
          {
            "number": "1",
            "name": "Data Analysis",
            "status": "Pending",
            "owners": [
              {
                "username": "michael_williams",
                "title": "Michael Williams",
                "key": "michael_williams_key"
              }
            ]
          },
          {
            "number": "2",
            "name": "Algorithm Implementation",
            "status": "In Progress",
            "owners": [
              {
                "username": "olivia_johnson",
                "title": "Olivia Johnson",
                "key": "olivia_johnson_key"
              },
              {
                "username": "david_smith",
                "title": "David Smith",
                "key": "david_smith_key"
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
// Function to open edit modal for topic
function openEditModal(topic) {
    const editOption = prompt(`Select parameter to edit for Topic "${topic.name}":
    1. Number
    2. Name
    3. Status
    4. Owners`);
  
    if (editOption !== null) {
      const optionNumber = parseInt(editOption);
  
      switch (optionNumber) {
        case 1:
          const newNumber = prompt(`Edit Topic Number "${topic.name}"\nEnter new number:`);
          if (newNumber !== null && newNumber !== topic.number) {
            topic.number = newNumber;
            updateTable(projectSelect.value);
          }
          break;
        case 2:
          const newName = prompt(`Edit Topic Name "${topic.name}"\nEnter new name:`);
          if (newName !== null && newName !== topic.name) {
            topic.name = newName;
            updateTable(projectSelect.value);
          }
          break;
        case 3:
          const newStatus = prompt(`Edit Topic "${topic.name}"\nEnter new status:`);
          if (newStatus !== null && newStatus !== topic.status) {
            updateTopicStatusAndSendEmail(topic, newStatus);
            updateTable(projectSelect.value);
          }
          break;
        case 4:
          const newOwnersInput = prompt(`Edit Topic Owners for "${topic.name}"\nEnter new owners (comma-separated list):`);
          if (newOwnersInput !== null) {
            const newOwnersArray = newOwnersInput.split(',').map(owner => ({ username: owner.trim(), title: owner, key: 'newUserKey' }));
            topic.owners = newOwnersArray;
            updateTable(projectSelect.value);
          }
          break;
        default:
          console.log("Invalid option");
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
       let mailBody = prompt(`Edit mail Body for ${owner.username}`);
       if (mailBody != null){
            console.log(`Sending email to ${owner.username} (${owner.title}): Topic "${topic.name}" status changed from "${oldStatus}" to "${topic.status}"  ${mailBody}`);
       }else{
            console.log(`Sending email to ${owner.username} (${owner.title}): Topic "${topic.name}" status changed from "${oldStatus}" to "${topic.status}"`);
       }
    });
  }
  
  // Call the function to populate the dropdown and handle project selection
  populateProjectDropdown();
  
  const projectSelect = document.getElementById('projectSelect');
  projectSelect.addEventListener('change', () => {
    const selectedProjectKey = projectSelect.value;
    updateTable(selectedProjectKey);
  });
  