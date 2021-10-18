const { NotImplementedError } = require('../extensions/index.js');

 const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

// module.exports = 

// class Node {
//   constructor(data) {
//       this.data = data;
//       this.left = null;
//       this.right = null;
//   }
// }

module.exports =  class BinarySearchTree {
  constructor () {
    this._rootTree = null;
  }
  root() {
    return this._rootTree;
  }

  findPlace(d, tree) {
    if(tree == null) return;
    if(d > tree.data) {
      if(tree.right == null) {
        return [tree, true];
      }
      return this.findPlace(d, tree.right)
    }
    else if(d < tree.data) {
      if(tree.left == null) {
        return [tree, false];
      }
      return this.findPlace(d, tree.left)
    }
  }

  findData(d, node) {
    if(d == node.data) {
      return node;
    }

    if (d > node.data) {
      if (node.right == null) {
        return null;
      }
      return this.findData(d, node.right);
    }
    else {
      if (node.left == null) {
        return null;
      }
      return this.findData(d, node.left);
    }

    return null;
  }


  add(node) {
   
  const placeAdd = this.findPlace(node, this._rootTree);
    if (placeAdd) {
      if (placeAdd[1]) {
        placeAdd[0].right = new Node(node);
        placeAdd[0].right.prev = placeAdd;
      }
      else {
        placeAdd[0].left = new Node(node);
        placeAdd[0].left.prev = placeAdd;
      }
    }
    if(this._rootTree == null) {
      this._rootTree = new Node(node);
    }
  }

  has(d) {
    const check = this.findData(d, this._rootTree);
    return (check != null) ? true: false;
  }

  find(d) {
    const obj = this.findData(d, this._rootTree);
    return obj;
  }

  remove(d) {
    const check = this.findData(d, this._rootTree);
    if(check) {

      if(check.left == null && check.right == null) {
        if(check.prev[1]) {
          check.prev[0].right = null;
        }
        else {
          check.prev[0].left = null;
        }
      }
      else if(check.left == null && check.right == null) {

      }



    }
  }

  min() {
   
  }

  max() {
   
  }

}

// const tree = new BinarySearchTree();
//       tree.add(2);
//       tree.add(7);
//       tree.add(1);
//       tree.add(8);
//       tree.add(4);
//       tree.add(32);
//       tree.add(12);
//       tree.add(14);


// console.log(tree.find(8).data)