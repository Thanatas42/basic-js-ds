const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.item = null;
  }

  root() {
    return this.item;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this.item) {
      this.item = newNode;
    } else {
      this.insertNode(this.item, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    return this.findNode(this.item, data);
  }

  findNode(node, data) {
    if (!node) {
      return null;
    }

    if (data < node.data) {
      return this.findNode(node.left, data);
    } else if (data > node.data) {
      return this.findNode(node.right, data);
    } else {
      return node;
    }
  }

  remove(data) {
    this.item = this.removeNode(this.item, data);
  }

  removeNode(node, key) {
    if (!node) {
      return null;
    }

    if (key < node.data) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (key > node.data) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      if (!node.left && !node.right) {
        node = null;
        return node;
      }

      if (!node.left) {
        node = node.right;
        return node;
      }

      if (!node.right) {
        node = node.left;
        return node;
      }

      let tempNode = this.findMinNode(node.right);
      node.data = tempNode.data;
      node.right = this.removeNode(node.right, tempNode.data);
      return node;
    }
  }

  findMinNode(node) {
    if (!node.left) {
      return node;
    }

    return this.findMinNode(node.left);
  }

  min() {
    if (!this.item) {
      return null;
    }

    let node = this.item;

    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this.item) {
      return null;
    }

    let node = this.item;

    while (node.right) {
      node = node.right;
    }
    
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};