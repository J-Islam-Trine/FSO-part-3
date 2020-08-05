import React, {useState, useEffect} from 'react';
import Filter from './components/Filter'
import Form from './components/Form'
import Person from './components/Person'
import numberServices from './services/number'


const Notification = ({message}) => {
  // console.log(message.message, message.type);
  const notificationStyle = {
    color: "green",
    border: "2px solid",
    margin: "5px"
  }

  const errorStyle = {
      color: "red",
      border: "2px solid",
      margin: "5px"
    
  }

  const textStyle = {
    padding: "5px 5px 5px 10px",
    margin: "0px"
  }

  

  if(message.text === null)
  {
    return (
      <> 
      </>
    )
  }
  else if (message.type === "notification")
  {
    return(
      <div style={notificationStyle}>
       <p style={textStyle}> {message.text}</p>
      </div>
    )
  }
  else if (message.type === "error")
  {
    return(
      <div style={errorStyle}>
       <p style={textStyle}> {message.text}</p>
      </div>
    )
  }
}

const App = () => {
    const [ persons, setPersons ] = useState(
      [])

      const [ viewResult, setViewResult] = useState(persons);
      const [ newName, setNewName ] = useState('')
      const [ newNumber, setNewNumber ] = useState('')
      const [notification, setNotification] = useState({text: null, type: 'notification'});

      const hook = () => {
            numberServices.getAll()
            .then(initialData => {
              setPersons(initialData);
              setViewResult(initialData);
            })
            .catch(error => {
              // console.log(error);
              setNotification({text: `server offline`, type: "error"});
              nullifier();
        });
      }

      const nullifier = () => {
        setTimeout(()=> {
          setNotification({text: null, type: 'notification'});
          hook();
        }, 3000)
      }

      useEffect(hook, []);

      const filterData = (e) => {
        // console.log(e.target.value);

        let searchResult = persons.filter(person => (person.name.toLowerCase()).includes(e.target.value));
          // console.log(searchResult);
        if(searchResult.length !== 0)
            {
                  setViewResult(searchResult);
            }
            else 
            {
              setViewResult(persons)
            }
      }

      const handleDeletion = (id, name) => {
        console.log(id);
        if (window.confirm(`${name} will be deleted`))
        {
          // console.log(`${id} will be deleted`);
          numberServices.remove(id)
          .then(responseStatus => {
            if (responseStatus === 204)
            {
              hook();
              setNotification({text: `${name} is deleted.`, type: "notification"})
              nullifier();
            }
          })
          .catch(error => {
            console.log(error);
            setNotification({text: `${name} has been already deleted from server`, type: "error"});
            nullifier();
      });
        }
        else
        {
        console.log('canceled'); 
        }
      }

      const handleNameInput = (e) => {
                setNewName(e.target.value);
      }

      const handleNumberInput = (e) => {
          setNewNumber(e.target.value);
      }

      const handleForm = (e) => {
            e.preventDefault();
            // console.log((newPersons.filter(person => person.name === newName)).length);
                  const newPerson = {
                    name: newName, 
                    number: newNumber
                  }
                  const instance = persons.filter(person => person.name === newName);
                  console.log(instance)
                  if (instance.length === 0)
                  {
                  numberServices.create(newPerson)
                  .then(updatedData => {
                    console.log(updatedData);
                if (updatedData.data)
                {
                  setNotification({text: `added ${newName} ${newNumber}`, type: "notification"});
                }
                else if (updatedData.error)
                {
                  setNotification({text: `${updatedData.error}`, type: "error"});
                }

                nullifier();

              });
            }
            
                  else if (instance.length === 1)
                  {
                    let id = instance[0].id;
                    numberServices.update(id, newPerson)
                  .then(updatedData => {
                    console.log(updatedData);
                    if (updatedData.data)
                {
                  setNotification({text: `updated ${newName} ${newNumber}`, type: "notification"});
                }
                else if (updatedData.error)
                {
                  setNotification({text: `${updatedData.error}`, type: "error"});
                }
                nullifier();

              });
            }
          }
      
    
      return (
        <div>
          <h3>Phonebook</h3>
          <Notification message={notification}/>
          <Filter onChange={filterData} />
          <h3>Add a new</h3>
          <Form onSubmit={handleForm} nameHandler={handleNameInput} numberHandler={handleNumberInput} />
          <h2>Numbers</h2>
          <Person persons={viewResult} onClick={handleDeletion}/>
        </div>
      )
  }

  export default App;