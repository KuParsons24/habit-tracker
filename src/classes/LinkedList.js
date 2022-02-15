class Node {
  constructor(element){
    this.element = element;
    this.next = null;
  }
}

class LinkedList {
  constructor(){
    this.head = null;
    this.size = 0;
  }
  //add(element)
  add(element) {
    if(!this.head) {
      this.head = new Node(element);
    } else {
      let curr = this.head;
      while (curr.next) {
        curr = curr.next;
      }
      curr.next = new Node(element);
    }
    this.size++;
  }

  //insrtAt(element, location)
  insertAt(element, location){

    const node = new Node(element);
    let curr = this.head;
    let prev = null;

    if (location >= 0 && location <= this.size){
      if (location === 0){
        node.next = this.head;
        this.head = node;
      } else {
        for (let i = 0; i < location; i++){
          prev = curr;
          curr = curr.next;
        }
        node.next = curr;
        prev.next = node;
      }
      this.size++;
    } else {
      console.error('Location does not exist. Please use a valid location.');
      return -1;
    }
  }

  removeFrom(location){
    let curr = this.head;
    let prev = null;

    if (location >= 0 && location < this.size){
      if (location === 0){
        this.head = curr.next;
      } else {
        for (let i = 0; i < location; i++){
          prev = curr;
          curr = curr.next;
        }
        prev.next = curr.next;
      }
      this.size--;
      return curr.element;
    } else {
      console.error('Location does not exist. Please use a valid location.');
      return -1;
    }
  }

  removeElement(element){
    let curr = this.head;
    let prev = null;

    while (curr){
      if (curr.element === element){
        if (!prev) {
          this.head = curr.next;
        } else {
          prev.next = curr.next;
        }
        this.size--;
        return curr.element
      } else {
        prev = curr;
        curr = curr.next;
      }
    }
    console.log('No such element found');
    return -1;
  }

  replaceElement(element, replacement){
    let curr = this.head;
    let prev = null;
    const node = new Node(replacement);

    while (curr){
      if (curr.element === element){
        if(!prev){
          node.next = curr.next;
          this.head = node;
        } else {
          node.next = curr.next;
          prev.next = node;
        }
        return curr.element;
      }
      prev = curr;
      curr = curr.next;
    }
    console.log('No such element found');
    return -1;
  }

  findElementById(id){
    let curr = this.head;

    while (curr){
      if (curr.element.id === id){
        return curr.element;
      }
      curr = curr.next;
    }
    console.log('No such element found');
    return -1;
  }

  printList(){
    let curr = this.head;
    while(curr){
      console.log(curr.element);
      curr = curr.next;
    }
  }

  isEmpty(){
    return this.size === 0;
  }

  sizeOfList(){
    return this.size;
  }
}

export { LinkedList };