let diagram;

function init() {
  const $ = go.GraphObject.make;

  diagram = $(go.Diagram, "myDiagramDiv",
                {
                  'animationManager.isEnabled': false
                }
               );

  diagram.groupTemplateMap.add('Sub Group',
    $(go.Group,
      new go.Binding("location", "loc", go.Point.parse),
      $(go.TextBlock,
        new go.Binding("text", "key"))
    )
  );

  diagram.groupTemplateMap.add('Main Group',
    $(go.Group, "Vertical",
      { selectionObjectName: "PH",
        locationObjectName: "PH",
        // Expand/contract group on double click
        doubleClick: function(event, obj) {
          obj.isSubGraphExpanded = !obj.isSubGraphExpanded;
        }
      },
      new go.Binding("location", "loc", go.Point.parse),
      $(go.TextBlock,  // group title
        { font: "Bold 12pt Sans-Serif" },
        new go.Binding("text", "key")),
      $(go.Shape,  // using a Shape instead of a Placeholder
        { name: "PH",
          fill: "lightyellow" },
        new go.Binding("desiredSize", "size", go.Size.parse))
    )
  );

  var nodeDataArray = [
    { key: "Alpha", category: 'Sub Group', isGroup: true, loc: "0 0" },
    { key: "Beta", category: 'Sub Group', isGroup: true, group: "Omega", loc: "75 75" },
    { key: "Gamma", category: 'Sub Group', isGroup: true, group: "Omega", loc: "125 75" },
    { key: "Omega", category: 'Main Group', isGroup: true, loc: "50 50", size: "150 50" },
    { key: "Delta", category: 'Sub Group', isGroup: true, loc: "200 0" }
  ];
  var linkDataArray = [
    { from: "Alpha", to: "Beta" },  // from outside the Group to inside it
    { from: "Beta", to: "Gamma" },  // this link is a member of the Group
    { from: "Omega", to: "Delta" }  // from the Group to a Node
  ];
  diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
  diagram.select(diagram.findNodeForKey("Omega"));
}
