import React, { useState } from 'react';

export default function Framework() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const frameworks = [
    {
      id: 'computer-vision',
      title: 'Computer Vision Model',
      icon: '🧠',
      subsections: [
        {
          name: 'Model',
          content: 'Leveraging advancements in computer vision, we can develop a numerical model to identify potential shark feeding grounds or habitats (e.g. in mesoscale eddies). Convolutional Neural Network (CNN) architectures can simultaneously analyze spatial information across multiple variables and across time. Taking NASA satellite data as input, the output would be a heatmap with areas highlighted with high probability for shark feeding ground hotspots. It\'s important that each model is tuned to different shark species as their migration and habitat conditions vary.'
        },
        {
          name: 'Verification',
          content: 'Verifying these predictions are crucial, and shark location data collected by acoustic receiver stations would serve as a ground truth for fine-tuning this model. Shark Link improves on this data collection.'
        }
      ]
    },
    {
      id: 'graph-theory',
      title: 'Graph Theory Analysis',
      icon: '📊',
      subsections: [
        {
          name: 'Overview',
          content: 'Using graphs or networks as a model has the benefit of simplifying complex shark movement behavior and allowing us to leverage powerful graph algorithms for hypothesizing:',
          gridItems: [
            {
              title: 'Movement Strategies',
              description: 'Shark movement strategies between habitats'
            },
            {
              title: 'Habitat Proximity',
              description: 'Proximity of their habitats'
            },
            {
              title: 'Shark Density',
              description: 'Shark density in these habitats'
            },
            {
              title: 'Feeding Duration',
              description: 'Length of stay in these hotspots for feeding'
            }
          ]
        },
        {
          name: 'Network Structure',
          content: 'Over time, these graphs can be adjusted to model shark migration by analyzing node degrees, centrality, and betweenness. We model receiver stations (e.g. buoys and rigs) and sharks as nodes in the graph, with shark movement between these stations as edges.'
        },
        {
          name: 'Integration',
          content: 'All together, we can build this graph by combining the shark hotspot CNN prediction models to place receiver stations in the center of each hotspot and then measuring shark movement between these hotspots.'
        }
      ]
    }
  ];

  return (
    <div className="framework-section">
      <div className="framework-container">
        <div className="framework-header">
          <h2>How Shark Link Helps Model Shark Foraging Behavior</h2>
          <p className="framework-subtitle">
            Shark Link innovates on shark tagging technology to improve data collection, meanwhile, we propose a framework for analyzing this data.
          </p>
        </div>

        <div className="framework-grid">
          {frameworks.map((framework) => (
            <div key={framework.id} className="framework-card">
              <button
                className="framework-card-header"
                onClick={() => toggleSection(framework.id)}
              >
                <span className="framework-icon">{framework.icon}</span>
                <h3>{framework.title}</h3>
                <span className={`expand-icon ${expandedSection === framework.id ? 'expanded' : ''}`}>
                  ▼
                </span>
              </button>

              {expandedSection === framework.id && (
                <div className="framework-content">
                  {framework.subsections.map((subsection, index) => (
                    <div key={index} className="subsection">
                      <h4>{subsection.name}</h4>
                      <p>{subsection.content}</p>
                      {subsection.gridItems && (
                        <div className="hypothesis-grid">
                          {subsection.gridItems.map((item, itemIndex) => (
                            <div key={itemIndex} className="hypothesis-item">
                              <h5>{item.title}</h5>
                              <p>{item.description}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}