class ModelEntity {
  constructor(data, menuItem) {
    this.id = data.id || this.generateIdFromText(data.submenuText); // use provided id or generate one if not provided
    this.submenuText = data.submenuText;
    this.submenuIconStart = data.submenuIconStart;
    this.template = data.template;
    if (data.template=='vizMap') {
      this.vizLayout = new VizMap(data.templateSettings, data.submenuText);
    } else if (data.template=='vizTrends') {
      this.vizLayout = new VizTrends(data.templateSettings);
    }
    this.mapSidebarItems = (data.mapSidebarItems || []).map(item => new MapSidebarItem(item, this));
    this.textFile = data.textFile;
    this.pngFile = data.pngFile;
    this.menuItem = menuItem;
  }
  
  generateIdFromText(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  createModelEntityElement() {
    console.log('createModelEntityElement');
    const modelEntity = document.createElement('calcite-menu-item');
    modelEntity.setAttribute('id', this.id);
    modelEntity.setAttribute('text', this.submenuText);
    modelEntity.setAttribute('icon-start', this.submenuIconStart);
    modelEntity.setAttribute('text-enabled', '');

    const modelEntityInstance = this;

    modelEntity.addEventListener('click', function() {
      let mainSidebarItems2 = document.querySelectorAll('calcite-menu-item');
      mainSidebarItems2.forEach(item2 => {
        if(item2.text === modelEntityInstance.menuText) {  // Use the saved instance context here
          item2.active = true;
        } else {
          item2.active = false;
        }
      });

      // Show corresponding template
      const allTemplates = document.querySelectorAll('.template');
      allTemplates.forEach(template => template.hidden = true);
  
      // Show the selected template
      const selectedTemplate = document.getElementById(modelEntityInstance.template + 'Template');
      if (selectedTemplate) {
        selectedTemplate.hidden = false;
        // ... (Any additional specific logic for the template type)
      }

      
      modelEntityInstance.menuItem.userLayout.hideAllUserLayoutLayers()

      modelEntityInstance.vizLayout.renderSidebar();  // Use the saved instance context here as well
      modelEntityInstance.vizLayout.updateDisplay();
      //modelEntityInstance.displayJSONData();
    });
    return modelEntity;
  }
  

  // Function to create and populate the table
  displayJSONData() {
    const jsonData = {
      "data": [
        [0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.135, 0.468, 0.791, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.135, 0.468, 0.791, 0.123],
        [0.456, 0.789, 0.321, 0.654, 0.987, 0.135, 0.468, 0.791, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.135, 0.468, 0.791, 0.123, 0.456],
        [0.789, 0.321, 0.654, 0.987, 0.135, 0.468, 0.791, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.135, 0.468, 0.791, 0.123, 0.456, 0.789],
        [0.321, 0.654, 0.987, 0.135, 0.468, 0.791, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.135, 0.468, 0.791, 0.123, 0.456, 0.789, 0.321],
        [0.654, 0.987, 0.135, 0.468, 0.791, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.135, 0.468, 0.791, 0.123, 0.456, 0.789, 0.321, 0.654],
        [0.987, 0.135, 0.468, 0.791, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.135, 0.468, 0.791, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987],
        [0.135, 0.468, 0.791, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.135, 0.468, 0.791, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.135],
        [0.468, 0.791, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.135, 0.468, 0.791, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.135, 0.468],
        [0.791, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.135, 0.468, 0.791, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.135, 0.468, 0.791],
        [0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.135, 0.468, 0.791, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.135, 0.468, 0.791, 0.123],
        [0.456, 0.789, 0.321, 0.654, 0.987, 0.135, 0.468, 0.791, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.135, 0.468, 0.791, 0.123, 0.456],
        [0.789, 0.321, 0.654, 0.987, 0.135, 0.468, 0.791, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.135, 0.468, 0.791, 0.123, 0.456, 0.789],
        [0.321, 0.654, 0.987, 0.135, 0.468, 0.791, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.135, 0.468, 0.791, 0.123, 0.456, 0.789, 0.321],
        [0.654, 0.987, 0.135, 0.468, 0.791, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.135, 0.468, 0.791, 0.123, 0.456, 0.789, 0.321, 0.654],
        [0.987, 0.135, 0.468, 0.791, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.135, 0.468, 0.791, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987],
        [0.135, 0.468, 0.791, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.135, 0.468, 0.791, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.135],
        [0.468, 0.791, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.135, 0.468, 0.791, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.135, 0.468],
        [0.791, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.135, 0.468, 0.791, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.135, 0.468, 0.791],
        [0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.135, 0.468, 0.791, 0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.135, 0.468, 0.791, 0.123]
      ]
    }

    const table = document.getElementById('matrixTable');
    table.innerHTML = '';
    
    // Create the header row for columns on row 1
    const headerRow = table.insertRow(0); // Insert at row 0
    headerRow.classList.add('header-row');

    // Create an empty cell for the row header column
    headerRow.insertCell();

    // Loop to create column headers with numbers
    for (let col = 0; col < jsonData.data[0].length; col++) {
        const headerCell = headerRow.insertCell();
        headerCell.textContent = `j ${col + 1}`; // Column numbers start from 1
    }

    // Loop through the rows and columns of the JSON data
    for (let rowIndex = 0; rowIndex < jsonData.data.length; rowIndex++) {
        const row = jsonData.data[rowIndex];
        const newRow = table.insertRow();

        // Create the cell in the first column for the row header
        const rowHeaderCell = newRow.insertCell();
        rowHeaderCell.textContent = `i ${rowIndex + 1}`; // Row numbers start from 1
        rowHeaderCell.classList.add('row-header'); // Apply the row header style

        // Loop through the data cells for this row, starting from the second column
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            const newCell = newRow.insertCell();
            newCell.textContent = row[colIndex].toFixed(3); // Format the number to show 3 decimal places
        }
    }
  }

  hideLayoutLayers() {
    if (this.vizLayout && typeof this.vizLayout.hideLayers === 'function') {
      this.vizLayout.hideLayers();
    }
  }
}
