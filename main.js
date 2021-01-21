let contacts = []
loadContacts()

/**
 * Called when submitting the new Contact Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the contacts list.
 * Then reset the form
 * *** hints:
 * *** push: resources/push.jpg
 */

function addContact(event) {
  event.preventDefault()
  let form = event.target
  let newContact = {}
  let newContactPhones = {}
  let newContactName = form.name.value
  let newContactPhone = form.phone.value
  let newEmergency = document.getElementById("emergency-checkbox").checked

  newContact = contacts.find(contactName => contactName.name == newContactName)
  newContactPhones = contacts.find(contactPhone => contactPhone.phone == newContactPhone)
  document.getElementById("phone-error").innerText = "" //reset phone error text
  document.getElementById("name-error").innerText = "" //reset name error text 


  if (!newContact && !newContactPhones) { //If no contact is the same as current, and no phone number is same as current, add to contacts array
    newContact = { name: newContactName, phone: newContactPhone, emergency: newEmergency }
    contacts.push(newContact)
    console.log("Added " + newContactName + " " + newContactPhone + " " + newEmergency)
    saveContacts()
    form.name.value = ""
    form.phone.value = ""

    //Clears error messages
    document.getElementById("phone-error").innerText = ""
    document.getElementById("name-error").innerText = ""

    //unchecks checkbox
    document.getElementById("emergency-checkbox").checked = false

  } else if (!newContact && newContactPhones) { //if phone number already exists, prompt error
    document.getElementById("phone-error").innerText = "Phone number already in use!"
  } else if (newContact && !newContactPhones) { //if name already exists, prompt error
    document.getElementById("name-error").innerText = "Name already in use!"
  } else { //if both name and number exist, prompt error
    document.getElementById("phone-error").innerText = "Phone number already in use!"
    document.getElementById("name-error").innerText = "Name already in use!"
  }

  drawContacts()
}

/**
 * Converts the contacts array to a JSON string then
 * Saves the string to localstorage at the key contacts 
 */
function saveContacts() {
  window.localStorage.setItem("contacts", JSON.stringify(contacts))
}

/**
 * Attempts to retrieve the contacts string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the contacts array to the retrieved array
 */
function loadContacts() {
  let contactsData = JSON.parse(window.localStorage.getItem("contacts"))
  if (contactsData) {
    contacts = contactsData
  }
}

/**
 * This function targets the contacts-list on the 
 * DOM and adds a new div element for each of the
 * contacts in the contacts array
 */
function drawContacts() {
  let template = ""
  contacts.forEach(contact => {
    if (contact.emergency) { //if contact is emergency, give special look
      template += `
      <div class="card mt-1 mb-1 emergency-contact">
        <h3 class="mt-1 mb-1">${contact.name}</h3>
        <div class="d-flex space-between">
          <p>
            <i class="fa fa-fw fa-phone"></i>
            <span>${contact.phone}</span>
          </p>
          <i class="action fa fa-trash text-danger" onclick="removeContact('${contact.name}')"></i>
        </div>
      </div>`
    } else {
      template += `
    <div class="card mt-1 mb-1">
        <h3 class="mt-1 mb-1">${contact.name}</h3>
        <div class="d-flex space-between">
          <p>
            <i class="fa fa-fw fa-phone"></i>
            <span>${contact.phone}</span>
          </p>
          <i class="action fa fa-trash text-danger" onclick="removeContact('${contact.name}')"></i>
        </div>
      </div>`
    }

  })

  document.getElementById("contact-list").innerHTML = template
}

/**
 * This function is called with a contact id
 * and will use the id to find and remove the 
 * contact by their id from the list of contacts
 * *** hints: 
 * *** findIndex: resources/findIndex.jpg
 * *** splice: resources/splice.jpg
 * @param {string} contactId 
 */
function removeContact(contactId) {
  const index = contacts.findIndex(selectedContact => selectedContact.name === contactId)
  var removeContact = contacts.splice(index, 1)

  saveContacts()
  drawContacts()
}

/**
 * Toggles the visibility of the AddContact Form
 */
function toggleAddContactForm() {
  document.getElementById("new-contact-form").classList.toggle("hidden") //toggles hidden class to show/hide form
}


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}


loadContacts()
drawContacts()