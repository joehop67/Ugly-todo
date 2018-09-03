import React from 'react'
import Collapsible from '../components/collapsible'
import toggle from '../util/toggle'
import Dropzone from 'react-dropzone'

export default class TodoList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      todo: {},
      add: false
    }
  }

  addItem = (target) => {
    const data = new FormData(target)
    var newList = {}
    newList[data.get('name')] = []
    this.setState(prev => {return {todo: Object.assign({}, prev.todo, newList), add: false}})
  }

  addTodo = (target, list) => {
    const data = new FormData(target)
    const todoList = this.state.todo
    todoList[list].push({item: data.get('name'), complete: false})
    this.setState(prev => {return {todo: todoList, item: false}})
  }

  setComplete = (list, item) => {
    const name = item.item
    const todos = this.state.todo
    const newTodo = todos[list].map((item) => {
      if (item.item === name) {
        return {item: item.item, complete: true}
      }
      return item
    })
    todos[list] = newTodo
    this.setState({todo: todos})
  }

  exportList = () => {
    const element = document.createElement('a')
    const textFile = new Blob([JSON.stringify(this.state.todo)], {type: 'application/json'})
    element.href = URL.createObjectURL(textFile)
    element.download = 'list.json'
    element.click()
  }

  onDrop = (files) => {
    const file = files[0]
    var reader = new FileReader()
    reader.onload = (fileR) => {
      let importFile = JSON.parse(fileR.target.result)
      console.log(importFile)
      this.setState({todo: importFile})
    }
    reader.readAsText(file)
  }

  render () {
    console.log(this.state.todo)
    const {add} = this.state
    return (
      <div className='home'>
        <style jsx>{`
          :global(body) {
            background: whitesmoke;
            font-family: 'Roboto', sans-serif;
          }
          header {
            display: none;
          }
          ul {
            list-style-type: none;
            padding: 0;
          }
          .sub {
            list-style-type: disc;
            padding-left: 2rem;
          }
          .home {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .complete {
            text-decoration: line-through;
          }
          .confirm {
            float: right;
          }
          .conf {
            margin: 0;
            margin-left: 1rem;
          }
          .item-form {
            display: flex;
            flex-direction: row;
          }
          h1 {
            text-align: center;
          }
          h3 {
            text-align: center;
          }
          button {
            margin: 1rem 2rem;
          }
          @media (max-width: 26rem) {
            header {
              display: block;
              margin: 1rem;
              margin-right: auto;
            }
            svg {
              z-index: 9999;
            }
            .btn-container button {
              background: #33a3dc;
              border-radius: 50%;
              width: 0;
              height: 0;
              border: none;
              outline: none;
              margin: 0;
              visibility: hidden;
            }
            .btn-container button:after {
              visibility: visible;
              background: #33a3dc;
              border-radius: 50%;
              position: absolute;
              padding: 1rem;
              width: 1rem;
              height: 1rem;
              border: none;
              outline: none;
              margin: 0;
            }
            .btn-container .btn:after {
              content: '+';
              left: 0;
              top: 0;
            }
            .btn-container .export:after {
              content: '>';
              right: 0;
              top: 0;
            }
            .btn-container {
              width: 50%;
              position: relative;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .dropzone {
              margin-top: 5rem;
            }

            .data {
              display: none;
            }
            .hack-slider {
              position: absolute;
              left: 0;
              max-width: 100%;
              min-width: 20rem;
              background: red;
              height: 100%;
              z-index: 9998
            }
            .confirm {
              margin-left: 10rem;
            }
          }
        `}</style>
        <header>
          {toggle((show, set) => {
            console.log(show)
            return (
              <React.Fragment>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => set(!show)}>
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                </svg>
              {show && <div className='hack-slider'>
              <ul className='list'>
            {Object.keys(this.state.todo).map(list => {
              return toggle((newItem, add) => {
                console.log(newItem)
                return (
                  <li>
                    <Collapsible title={list}>
                      <div className='add-list-item-mobile'>
                        {(this.state.todo && this.state.todo[list].length > 0) && <ul className='mob'>
                          {this.state.todo[list].map(item => {
                            return <li className={item.complete ? 'complete' : ''}>
                            {item.item} 
                            {!item.complete && <input type='checkbox' className='check' onChange={() => this.setComplete(list, item)} />}
                            </li>
                          })}
                        </ul>}
                        <button type='button' className='confirm' onClick={() => add(true)}>Add Item</button>
                        {newItem && <div className='item-form'>
                          <form onSubmit={(e) => {
                            e.preventDefault()
                            this.addTodo(e.target, list)
                          }}>
                            <input name='name' type='text' />
                            <button type='submit' className='conf'>Confirm</button>
                          </form>
                        </div>}
                      </div>
                    </Collapsible>
                  </li>
                )
              }, false)
            })}
          </ul>
              </div>}
              </React.Fragment>
            )
          }, false)}
        </header>
        <h1>Todo List!</h1>
        <div className='data'>
          <ul className='list'>
            {Object.keys(this.state.todo).map(list => {
              return toggle((newItem, add) => {
                console.log(newItem)
                return (
                  <li>
                    <Collapsible title={list}>
                      <div className='add-list-item'>
                        {(this.state.todo && this.state.todo[list].length > 0) && <ul className='sub'>
                          {this.state.todo[list].map(item => {
                            return <li className={item.complete ? 'complete' : ''}>
                            {item.item} 
                            {!item.complete && <input type='checkbox' className='check' onChange={() => this.setComplete(list, item)} />}
                            </li>
                          })}
                        </ul>}
                        <button type='button'  className='confirm' onClick={() => add(true)}>Add Item</button>
                        {newItem && <div className='item-form'>
                          <form onSubmit={(e) => {
                            e.preventDefault()
                            this.addTodo(e.target, list)
                          }}>
                            <input name='name' type='text' />
                            <button type='submit' className='conf'>Confirm</button>
                          </form>
                        </div>}
                      </div>
                    </Collapsible>
                  </li>
                )
              }, false)
            })}
          </ul>
        </div>
        <div className='add-form'>
          {add && <form onSubmit={(e) => {
              e.preventDefault()
              this.addItem(e.target)
              }}>
              <input name='name' type='text' />
              <button type='submit'>Confirm</button>
            </form>}
        </div>
        <div className='btn-container'>
          <button type='button' className='btn' onClick={() => this.setState({add: true})}>Add List</button>
          <button type='button' className='export' onClick={this.exportList}>Export</button>
        </div>
        <div className='dropzone'>
          <Dropzone onDrop={(files) => this.onDrop(files)}>
            <h3>Drop JSON here to import list</h3>
          </Dropzone>
        </div>
      </div>
    )
  }
}