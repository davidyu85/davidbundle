(function() {
  packages = {

    // Lazily construct the package hierarchy from class names.
    root: function(arr) {
      var map = {};

      function find(name, data) {
        var node = map[name], i;
        if (!node) {
          node = map[name] = data || {name: name, children: []};
          if (name.length) {
            node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
            node.parent.children.push(node);
            node.key = name.substring(i + 1);
          }
        }
        return node;
      }

      arr.forEach(function(d) {
        find(d.name, d);
      });

      return map[""];
    },

    // Return a list of match for the given array of nodes.
    match: function(nodes) {
      var map = {},
          match = [];

      // Compute a map from name to node.
      nodes.forEach(function(d) {
        map[d.name] = d;
      });

      // For each import, construct a link from the source to target node.
      nodes.forEach(function(d) {
        if (d.match) d.match.forEach(function(i) {
          match.push({source: map[d.name], target: map[i]});
        });
      });

      return match;
    }

  };
})();
