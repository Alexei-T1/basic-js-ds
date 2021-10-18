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
    if(check != null) {

      if(check.left == null && check.right == null) {
        if(check.prev[1]) {
          check.prev[0].right = null;
        }
        else {
          check.prev[0].left = null;
        }
      }
      else if(check.left == null && check.right != null) {
        if(check.prev[1]) {
          check.prev[0].right = check.right;
        }
        else {
          check.prev[0].left = check.right;
        }
      }
      else if(check.right == null && check.left != null) {
        if(check.prev[1]) {
          check.prev[0].right = check.left;
        }
        else {
          check.prev[0].left = check.left;
        }
      }
      else {
        const nodeLeft = check.left;
        const nodeRight = check.right;
        function nodeRightLeft(nodeRight) {
         
          if(nodeRight.left == null) {
            return nodeRight;
          }

          const left = nodeRight.left;

          function onlyLeft(left) {
            if(left.left == null) {
              return left;
            }
            return onlyLeft(left.left);
          };

          const nodeRightLeft =  onlyLeft(left);
            

          return nodeRightLeft;
        }
        const placedNode = nodeRightLeft(nodeRight);

      if(check === this._rootTree) {
        this._rootTree = placedNode;
        placedNode.left = nodeLeft;
        nodeRight.left = (placedNode.right != null) ? placedNode.right : null;
        placedNode.right = nodeRight;
      } 
      else if(check.prev[1]){
        check.prev[0].right = placedNode;
        placedNode.left = nodeLeft;
        if (nodeRight != placedNode) {
          nodeRight.left = (placedNode.right != null) ? placedNode.right : null;
        }
        placedNode.right = nodeRight;
      }
      else{
        check.prev[0].left = placedNode;
        placedNode.left = nodeLeft;
        if (nodeRight != placedNode) {
          nodeRight.left = (placedNode.right != null) ? placedNode.right : null;
        }
        placedNode.right = nodeRight;
      }

      }
    }

  }

  min() {
    if(this._rootTree == null || this._rootTree.left == null) {
      return this._rootTree;
    }

    else {
      const tree = this._rootTree;
      function minLeft(tree) {
        if(tree.left == null) {
          return tree;
        }
        return minLeft(tree.left);
      }
      return minLeft(tree).data;
    }
   
  }

  max() {
    if(this._rootTree == null || this._rootTree.right == null) {
      return this._rootTree;
    }
    else {
      const tree = this._rootTree.right;
      function maxRight(tree) {
        if(tree.right == null) {
          return tree;
        }
        return maxRight(tree.right);
      }
      return maxRight(tree).data;
    }

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