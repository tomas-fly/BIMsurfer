define(function () {
	var getQuery = function (schema) {
		if (schema === 'ifc4') {
			return getQueryIfc4();
		} else {
			return getQueryIfc2x3();
		}
	}

	function getQueryIfc4() {
		return {
			defines: {
				Representation: {
					type: 'IfcProduct',
					field: 'Representation'
				},
				ContainsElementsDefine: {
					type: 'IfcSpatialStructureElement',
					field: 'ContainsElements',
					include: {
						type: 'IfcRelContainedInSpatialStructure',
						field: 'RelatedElements',
						includes: [
							'IsDecomposedByDefine',
							'ContainsElementsDefine',
							'Representation'
						]
					}
				},
				IsDecomposedByDefine: {
					type: 'IfcObjectDefinition',
					field: 'IsDecomposedBy',
					include: {
						type: 'IfcRelAggregates',
						field: 'RelatedObjects',
						includes: [
							'IsDecomposedByDefine',
							'ContainsElementsDefine',
							'Representation'
						]
					}
				}
			},
			queries: [
				{
					type: 'IfcProject',
					includes: [
						'IsDecomposedByDefine',
						'ContainsElementsDefine'
					]
				},
				{
					type: 'IfcRepresentation',
					includeAllSubTypes: true
				},
				{
					type: 'IfcProductRepresentation'
				},
				{
					type: 'IfcPresentationLayerWithStyle'
				},
				{
					type: 'IfcProduct',
					includeAllSubTypes: true
				},
				{
					type: 'IfcProductDefinitionShape'
				},
				{
					type: 'IfcPresentationLayerAssignment'
				},
				{
					type: 'IfcRelAssociatesClassification',
					includes: [
						{
							type: 'IfcRelAssociatesClassification',
							field: 'RelatedObjects'
						},
						{
							type: 'IfcRelAssociatesClassification',
							field: 'RelatingClassification'
						}
					]
				},
				{
					type: 'IfcSIUnit'
				},
				{
					type: 'IfcPresentationLayerAssignment'
				}
			]
		};
	}

	function getQueryIfc2x3() {
		return {
			defines: {
				Representation: {
					type: 'IfcProduct',
					fields: ['Representation', 'geometry']
				},
				ContainsElementsDefine: {
					type: 'IfcSpatialStructureElement',
					field: 'ContainsElements',
					include: {
						type: 'IfcRelContainedInSpatialStructure',
						field: 'RelatedElements',
						includes: [
							'IsDecomposedByDefine',
							'ContainsElementsDefine',
							'Representation'
						]
					}
				},
				IsDecomposedByDefine: {
					type: 'IfcObjectDefinition',
					field: 'IsDecomposedBy',
					include: {
						type: 'IfcRelDecomposes',
						field: 'RelatedObjects',
						includes: [
							'IsDecomposedByDefine',
							'ContainsElementsDefine',
							'Representation'
						]
					}
				}
			},
			queries: [
				{
					type: 'IfcProject',
					includes: [
						'IsDecomposedByDefine',
						'ContainsElementsDefine'
					]
				},
				{
					type: {
						name: 'IfcRepresentation',
						includeAllSubTypes: true
					}
				},
				{
					type: {
						name: 'IfcRepresentationItem',
						includeAllSubTypes: true
					}
				},
				{
					type: {
						name: 'IfcProductRepresentation',
						includeAllSubTypes: true
					}
				},
				{
					type: 'IfcPresentationLayerWithStyle'
				},
				{
					type: {
						name: 'IfcProduct',
						includeAllSubTypes: true
					}
				},
				{
					type: 'IfcProductDefinitionShape'
				},
				{
					type: 'IfcPresentationLayerAssignment'
				},
				{
					type: 'IfcRelAssociatesClassification',
					includes: [
						{
							type: 'IfcRelAssociatesClassification',
							field: 'RelatedObjects'
						},
						{
							type: 'IfcRelAssociatesClassification',
							field: 'RelatingClassification'
						}
					]
				},
				{
					type: 'IfcSIUnit'
				},
				{
					type: 'IfcPresentationLayerAssignment'
				}
			]
		};
	}

	return { 'getQuery': getQuery };
});
