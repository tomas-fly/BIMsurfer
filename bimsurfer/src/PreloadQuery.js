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
					type: 'IfcProduct',
					includeAllSubTypes: true
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
						name: 'IfcProduct',
						includeAllSubTypes: true
					}
				}
			]
		};
	}

	return { 'getQuery': getQuery };
});