import { useState, useEffect, useRef } from 'react';
import portfolioData from '../data/portfolioData';

export default function Playground() {
  const [activeTab, setActiveTab] = useState('churn');

  // ============================================
  // TELECOM CHURN PREDICTOR STATE
  // ============================================
  const [tenure, setTenure] = useState(12);
  const [contract, setContract] = useState('Month-to-month');
  const [internetService, setInternetService] = useState('Fiber optic');
  const [monthlyCharges, setMonthlyCharges] = useState(75);
  const [paperlessBilling, setPaperlessBilling] = useState(true);
  const [techSupport, setTechSupport] = useState(false);

  // Predictions derived dynamically
  const [churnRisk, setChurnRisk] = useState(0);
  const [riskFactors, setRiskFactors] = useState([]);
  const [shapData, setShapData] = useState([]);

  // Calculate Churn Risk
  useEffect(() => {
    let score = 20; // base risk %
    const factors = [];
    const shap = [];

    // Contract Factor
    if (contract === 'Month-to-month') {
      score += 25;
      factors.push({ type: 'risk', text: 'Month-to-month billing cycles correlate with higher subscription turnover.' });
      shap.push({ feature: 'Contract Type', value: 25, type: 'positive' });
    } else if (contract === 'One year') {
      score += 5;
      shap.push({ feature: 'Contract Type', value: 5, type: 'positive' });
    } else {
      score -= 15;
      factors.push({ type: 'benefit', text: 'Two-year commitment indicates strong long-term customer retention.' });
      shap.push({ feature: 'Contract Type', value: -15, type: 'negative' });
    }

    // Internet Service Factor
    if (internetService === 'Fiber optic') {
      score += 20;
      factors.push({ type: 'risk', text: 'Fiber optic plans have higher churn correlation, often due to price-sensitivity.' });
      shap.push({ feature: 'Internet Service', value: 20, type: 'positive' });
    } else if (internetService === 'DSL') {
      score += 5;
      shap.push({ feature: 'Internet Service', value: 5, type: 'positive' });
    } else {
      score -= 10;
      factors.push({ type: 'benefit', text: 'No active internet subscription limits churn probability.' });
      shap.push({ feature: 'Internet Service', value: -10, type: 'negative' });
    }

    // Tech Support Factor
    if (internetService !== 'None') {
      if (!techSupport) {
        score += 15;
        factors.push({ type: 'risk', text: 'Absence of active technical support increases churn probability.' });
        shap.push({ feature: 'Tech Support', value: 15, type: 'positive' });
      } else {
        score -= 10;
        factors.push({ type: 'benefit', text: 'Active technical support strongly improves customer lifetime value.' });
        shap.push({ feature: 'Tech Support', value: -10, type: 'negative' });
      }
    } else {
      shap.push({ feature: 'Tech Support', value: 0, type: 'neutral' });
    }

    // Tenure Factor
    if (tenure < 6) {
      score += 20;
      factors.push({ type: 'risk', text: `Early customer lifecycle phase (${tenure} months) has higher baseline churn risk.` });
      shap.push({ feature: 'Customer Tenure', value: 20, type: 'positive' });
    } else if (tenure > 24) {
      score -= 15;
      factors.push({ type: 'benefit', text: `Established customer lifecycle tenure (${tenure} months) correlates with high retention.` });
      shap.push({ feature: 'Customer Tenure', value: -15, type: 'negative' });
    } else {
      shap.push({ feature: 'Customer Tenure', value: 0, type: 'neutral' });
    }

    // Monthly Charges Factor
    if (monthlyCharges > 85) {
      score += 15;
      factors.push({ type: 'risk', text: `Higher monthly charges ($${monthlyCharges}/mo) increases price sensitivity risk.` });
      shap.push({ feature: 'Monthly Bill', value: 15, type: 'positive' });
    } else if (monthlyCharges < 40) {
      score -= 10;
      factors.push({ type: 'benefit', text: `Lower bill size ($${monthlyCharges}/mo) reduces financial churn pressure.` });
      shap.push({ feature: 'Monthly Bill', value: -10, type: 'negative' });
    } else {
      shap.push({ feature: 'Monthly Bill', value: 2, type: 'positive' });
    }

    // Paperless Billing Factor
    if (paperlessBilling) {
      score += 3;
      shap.push({ feature: 'Paperless Billing', value: 3, type: 'positive' });
    } else {
      score -= 2;
      shap.push({ feature: 'Paperless Billing', value: -2, type: 'negative' });
    }

    // Clamp score
    const finalScore = Math.max(2, Math.min(98, score));
    setChurnRisk(finalScore);
    setRiskFactors(factors);
    setShapData(shap);
  }, [tenure, contract, internetService, monthlyCharges, paperlessBilling, techSupport]);

  // ============================================
  // AI CHEF ASSISTANT STATE
  // ============================================
  const defaultIngredients = ['Tomato', 'Egg', 'Potato', 'Cheese', 'Chicken', 'Rice', 'Onion', 'Garlic'];
  const [selectedIngredients, setSelectedIngredients] = useState(['Egg', 'Tomato']);
  const [cookingStyle, setCookingStyle] = useState('Quick & Easy');
  const [temperature, setTemperature] = useState(0.7);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
  const [isChefLoading, setIsChefLoading] = useState(false);
  const [chefLogs, setChefLogs] = useState([]);
  const [generatedRecipe, setGeneratedRecipe] = useState('');
  
  const logTerminalRef = useRef(null);

  useEffect(() => {
    if (logTerminalRef.current) {
      logTerminalRef.current.scrollTop = logTerminalRef.current.scrollHeight;
    }
  }, [chefLogs]);

  const saveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
  };

  const toggleIngredient = (ing) => {
    if (selectedIngredients.includes(ing)) {
      setSelectedIngredients(selectedIngredients.filter((i) => i !== ing));
    } else {
      setSelectedIngredients([...selectedIngredients, ing]);
    }
  };

  const handleGenerateRecipe = async () => {
    setIsChefLoading(true);
    setGeneratedRecipe('');
    setChefLogs([]);

    const logSteps = [
      `>> Initializing recipe generation engine...`,
      `>> Processing available ingredients: [${selectedIngredients.join(', ')}]`,
      `>> Configuring recipe parameters: Style = "${cookingStyle}", Selection Diversity = ${temperature}`,
      `>> Running classification algorithm...`,
    ];

    // Trigger step-by-step logging simulation
    for (let i = 0; i < logSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setChefLogs((prev) => [...prev, logSteps[i]]);
    }

    if (apiKey.trim()) {
      setChefLogs((prev) => [...prev, `>> API Key detected. Querying Gemini-2.5-Flash model...`]);
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are a culinary AI Agent. Act as an expert concierge chef.
Generate a recipe matching these criteria:
- Ingredients available: ${selectedIngredients.join(', ')}
- Cooking style: ${cookingStyle}
- Tone: Technical, precise, with professional plating tips.
Format your output beautifully in clean markdown. Begin with a professional header '# Recipe Name', then '## Prep Time & Details', '## Ingredients', and '## Directions'.`,
                    },
                  ],
                },
              ],
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`API status error: ${response.status}`);
        }

        const data = await response.json();
        const recipeText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!recipeText) {
          throw new Error('Empty response from Gemini API.');
        }

        setChefLogs((prev) => [...prev, `>> Output received. Formatting markdown recipe elements...`]);
        await new Promise((resolve) => setTimeout(resolve, 600));
        setChefLogs((prev) => [...prev, `>> Compilation successful. Recipe generation complete.`]);
        setGeneratedRecipe(recipeText);
      } catch (err) {
        setChefLogs((prev) => [
          ...prev,
          `>> Request failed: ${err.message}`,
          `>> Activating fallback local recipe compiler...`,
        ]);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        runSimulatedRecipe();
      }
    } else {
      setChefLogs((prev) => [...prev, `>> Local mode active. Accessing local recipe database...`]);
      await new Promise((resolve) => setTimeout(resolve, 1200));
      runSimulatedRecipe();
    }
  };

  const runSimulatedRecipe = () => {
    // Determine simulated recipe matching ingredients
    let recipeTitle = "Chef's Surprise Fusion Bowl";
    let prepTime = "15 minutes";
    let directions = [
      "Lightly chop and prepare your available ingredients.",
      "Heat a pan with oil, sauteing onions and garlic until caramelized and fragrant.",
      "Incorporate the rest of your ingredients, tossing lightly over medium-high heat.",
      "Garnish with herbs, plate cleanly, and serve immediately.",
    ];
    let recipeIngredients = [...selectedIngredients];

    const has = (ing) => selectedIngredients.includes(ing);

    if (has('Chicken') && has('Rice') && has('Garlic')) {
      recipeTitle = "Garlic Butter Chicken Rice Bowl";
      prepTime = "25 minutes";
      recipeIngredients = ['Chicken Breast', 'Rice', 'Garlic', 'Butter', 'Soy Sauce', ...selectedIngredients.filter(i => !['Chicken','Rice','Garlic'].includes(i))];
      directions = [
        "Rinse and boil the rice until tender; set aside.",
        "Dice chicken breast into bite-sized cubes and mince the garlic.",
        "Melt butter in a skillet over medium heat, fry the garlic until golden, then sear the chicken until golden-brown and cooked through (6-8 mins).",
        "Add cooked rice into the skillet, pour in a splash of soy sauce, and stir-fry over high heat for 3 minutes.",
        "Serve hot with a sprinkle of green onions or sesame seeds if available.",
      ];
    } else if (has('Egg') && has('Tomato') && has('Onion')) {
      recipeTitle = "Classic Shakshuka";
      prepTime = "20 minutes";
      recipeIngredients = ['Eggs', 'Tomatoes', 'Onion', 'Olive Oil', 'Garlic', 'Chili Flakes'];
      directions = [
        "Dice the onions and tomatoes. Finely mince the garlic.",
        "Heat olive oil in a pan, add onions and garlic, cooking until soft and transparent.",
        "Stir in tomatoes, mashing them down to form a rich, thick simmered sauce (10 mins).",
        "Create small wells in the sauce and crack the eggs directly into them.",
        "Cover the pan and cook on low heat for 5-8 minutes until egg whites are set but yolks remain runny.",
      ];
    } else if (has('Cheese') && has('Potato')) {
      recipeTitle = "Glow-Baked Cheesy Hash Potatoes";
      prepTime = "30 minutes";
      recipeIngredients = ['Potatoes', 'Cheddar/Parmesan Cheese', 'Garlic Powder', 'Olive Oil', 'Salt & Pepper'];
      directions = [
        "Peel and thinly slice potatoes or grate them into hash brown shreds.",
        "Parboil potato slices in salted water for 5 minutes, then drain and dry thoroughly.",
        "Toss potatoes in olive oil, garlic powder, salt, and pepper.",
        "Spread in a baking dish or fry in a pan until crispy and gold.",
        "Top generously with cheese and cover until melted, creating a rich crispy cheese pull.",
      ];
    }

    const markdownOutput = `# ${recipeTitle}

## Prep Details
- **Prep Time**: ${prepTime}
- **Style**: ${cookingStyle}
- **Generation Type**: Local compilation

## Ingredients List
${recipeIngredients.map((i) => `- ${i}`).join('\n')}

## Step-by-Step Directions
${directions.map((d, index) => `${index + 1}. ${d}`).join('\n')}

---
*Plating Tip: Serve in a wide shallow bowl, utilizing contrast coloring and high-intensity presentation methods.*`;

    setChefLogs((prev) => [...prev, `>> Recipe mapped successfully.`]);
    setGeneratedRecipe(markdownOutput);
    setIsChefLoading(false);
  };

  // Convert markdown-like headers/lists to HTML safely
  const renderMarkdown = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, idx) => {
      if (line.startsWith('# ')) {
        return <h2 key={idx} className="recipe-header">{line.replace('# ', '')}</h2>;
      }
      if (line.startsWith('## ')) {
        return <h3 key={idx} className="recipe-subheader">{line.replace('## ', '')}</h3>;
      }
      if (line.startsWith('- ')) {
        return <li key={idx} className="recipe-ingredient-item">{line.replace('- ', '')}</li>;
      }
      if (/^\d+\./.test(line)) {
        return <p key={idx} className="recipe-step">{line}</p>;
      }
      if (line.startsWith('---')) {
        return <hr key={idx} className="recipe-divider" />;
      }
      if (line.startsWith('*') && line.endsWith('*')) {
        return <em key={idx} className="recipe-tip">{line.replace(/\*/g, '')}</em>;
      }
      return line.trim() ? <p key={idx} className="recipe-text">{line}</p> : <br key={idx} />;
    });
  };

  return (
    <section className="section playground-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Interactive Sandbox</span>
          <h1 className="section-title">AI & ML Playground</h1>
          <p className="section-subtitle">
            An interactive sandbox showcasing predictive machine learning models and large language model integration.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="playground-tabs">
          <button
            className={`playground-tab-btn ${activeTab === 'churn' ? 'active' : ''}`}
            onClick={() => setActiveTab('churn')}
          >
            Churn Predictor (ML Dashboard)
          </button>
          <button
            className={`playground-tab-btn ${activeTab === 'chef' ? 'active' : ''}`}
            onClick={() => setActiveTab('chef')}
          >
            Recipe Planner (GenAI Model)
          </button>
        </div>

        {/* Tab Content */}
        <div className="playground-content-card glass-card">
          {activeTab === 'churn' ? (
            <div className="churn-playground">
              <div className="playground-grid">
                
                {/* Form Controls */}
                <div className="playground-controls">
                  <h3 className="control-title">Customer Attributes</h3>
                  
                  <div className="control-group">
                    <label className="control-label">
                      Tenure: <span>{tenure} months</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="72"
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="slider"
                    />
                  </div>

                  <div className="control-group">
                    <label className="control-label">Contract Type</label>
                    <div className="select-wrapper">
                      <select value={contract} onChange={(e) => setContract(e.target.value)}>
                        <option value="Month-to-month">Month-to-month</option>
                        <option value="One year">One year</option>
                        <option value="Two year">Two year</option>
                      </select>
                    </div>
                  </div>

                  <div className="control-group">
                    <label className="control-label">Internet Service</label>
                    <div className="select-wrapper">
                      <select
                        value={internetService}
                        onChange={(e) => setInternetService(e.target.value)}
                      >
                        <option value="Fiber optic">Fiber optic (Premium)</option>
                        <option value="DSL">DSL</option>
                        <option value="None">None</option>
                      </select>
                    </div>
                  </div>

                  <div className="control-group">
                    <label className="control-label">
                      Monthly Charges: <span>${monthlyCharges}</span>
                    </label>
                    <input
                      type="range"
                      min="15"
                      max="120"
                      value={monthlyCharges}
                      onChange={(e) => setMonthlyCharges(Number(e.target.value))}
                      className="slider"
                    />
                  </div>

                  <div className="checkbox-row">
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={techSupport}
                        onChange={(e) => setTechSupport(e.target.checked)}
                        disabled={internetService === 'None'}
                      />
                      <span className={`checkmark ${internetService === 'None' ? 'disabled' : ''}`}></span>
                      Tech Support Included
                    </label>
                  </div>

                  <div className="checkbox-row">
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={paperlessBilling}
                        onChange={(e) => setPaperlessBilling(e.target.checked)}
                      />
                      <span className="checkmark"></span>
                      Paperless Billing Enabled
                    </label>
                  </div>
                </div>

                {/* Dashboard Outputs */}
                <div className="playground-dashboard">
                  
                  {/* Gauge section */}
                  <div className="gauge-panel">
                    <div className="gauge-circle-wrapper">
                      <svg className="gauge-svg" viewBox="0 0 100 100">
                        <circle className="gauge-track" cx="50" cy="50" r="40" />
                        <circle
                          className="gauge-value"
                          cx="50"
                          cy="50"
                          r="40"
                          style={{
                            strokeDasharray: `${2 * Math.PI * 40}`,
                            strokeDashoffset: `${2 * Math.PI * 40 * (1 - churnRisk / 100)}`,
                            stroke: churnRisk > 60 ? 'var(--accent-pink)' : churnRisk > 30 ? 'var(--accent-orange)' : 'var(--accent-green)',
                          }}
                        />
                      </svg>
                      <div className="gauge-value-text">
                        <span className="risk-percent" style={{
                          color: churnRisk > 60 ? 'var(--accent-pink)' : churnRisk > 30 ? 'var(--accent-orange)' : 'var(--accent-green)'
                        }}>{churnRisk}%</span>
                        <span className="risk-label">Churn Probability</span>
                      </div>
                    </div>

                    <div className="risk-status-badge" style={{
                      background: churnRisk > 60 ? 'rgba(236, 72, 153, 0.15)' : churnRisk > 30 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                      border: `1px solid ${churnRisk > 60 ? 'var(--accent-pink)' : churnRisk > 30 ? 'var(--accent-orange)' : 'var(--accent-green)'}`,
                      color: churnRisk > 60 ? 'var(--accent-pink)' : churnRisk > 30 ? 'var(--accent-orange)' : 'var(--accent-green)',
                    }}>
                      {churnRisk > 60 ? 'High Churn Probability' : churnRisk > 30 ? 'Moderate Churn Probability' : 'Low Churn Probability'}
                    </div>
                  </div>

                  {/* SHAP Chart */}
                  <div className="shap-panel">
                    <h4 className="panel-title">Feature Attribution (SHAP Values)</h4>
                    <p className="panel-desc">Displays the positive (churn-increasing) and negative (churn-reducing) weight of each feature on the model score.</p>
                    <div className="shap-chart">
                      {shapData.map((item, idx) => (
                        <div className="shap-bar-row" key={idx}>
                          <span className="shap-label">{item.feature}</span>
                          <div className="shap-bar-track">
                            {item.value > 0 ? (
                              <div
                                className="shap-bar positive-bar"
                                style={{ width: `${(item.value / 25) * 50}%`, marginLeft: '50%' }}
                              >
                                <span className="shap-bar-val">+{item.value}%</span>
                              </div>
                            ) : item.value < 0 ? (
                              <div
                                className="shap-bar negative-bar"
                                style={{ width: `${(Math.abs(item.value) / 25) * 50}%`, marginRight: '50%', justifySelf: 'end' }}
                              >
                                <span className="shap-bar-val">{item.value}%</span>
                              </div>
                            ) : (
                              <div className="shap-bar-zero">0%</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Insights */}
                  <div className="insights-panel">
                    <h4 className="panel-title">Key Churn Risk Factors</h4>
                    <ul className="insights-list">
                      {riskFactors.length > 0 ? (
                        riskFactors.map((factor, idx) => (
                          <li key={idx} className={`insight-item ${factor.type}-insight`}>
                            {factor.type === 'risk' ? '⚠️' : '🛡️'} {factor.text}
                          </li>
                        ))
                      ) : (
                        <li className="insight-item neutral-insight">
                          ✨ All indicators are matching baseline risk.
                        </li>
                      )}
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          ) : (
            <div className="chef-playground">
              <div className="playground-grid">
                
                {/* Form Controls */}
                <div className="playground-controls">
                  <h3 className="control-title">Recipe Configuration</h3>

                  <div className="control-group">
                    <label className="control-label">Gemini API Key (Optional)</label>
                    <input
                      type="password"
                      placeholder="Paste your Gemini API key to run a live query..."
                      value={apiKey}
                      onChange={(e) => saveApiKey(e.target.value)}
                      className="text-input"
                    />
                    <p className="input-tip">
                      Your key is processed securely in the client browser and is not stored. Leave empty to use pre-compiled recipes instantly.
                    </p>
                  </div>

                  <div className="control-group">
                    <label className="control-label">Available Ingredients</label>
                    <div className="ingredients-grid">
                      {defaultIngredients.map((ing) => (
                        <button
                          key={ing}
                          className={`ingredient-chip ${selectedIngredients.includes(ing) ? 'active' : ''}`}
                          onClick={() => toggleIngredient(ing)}
                        >
                          {ing}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="control-group">
                    <label className="control-label">Cooking Style</label>
                    <div className="select-wrapper">
                      <select value={cookingStyle} onChange={(e) => setCookingStyle(e.target.value)}>
                        <option value="Quick & Easy">Quick & Easy</option>
                        <option value="Gourmet">Gourmet Experience</option>
                        <option value="Comfort Food">Hearty Comfort Food</option>
                      </select>
                    </div>
                  </div>

                  <div className="control-group">
                    <label className="control-label">
                      Creativity Index (Temperature): <span>{temperature}</span>
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.1"
                      value={temperature}
                      onChange={(e) => setTemperature(Number(e.target.value))}
                      className="slider"
                    />
                  </div>

                  <button
                    className="btn btn-primary generate-chef-btn"
                    onClick={handleGenerateRecipe}
                    disabled={isChefLoading || selectedIngredients.length === 0}
                  >
                    {isChefLoading ? 'Querying Model...' : 'Generate Recipe'}
                  </button>
                </div>

                {/* Agent Logs & Recipe Output */}
                <div className="chef-outputs">
                  
                  {/* Logs Terminal */}
                  <div className="terminal-logs-panel">
                    <div className="terminal-header">
                      <span className="terminal-dot red-dot"></span>
                      <span className="terminal-dot yellow-dot"></span>
                      <span className="terminal-dot green-dot"></span>
                      <span className="terminal-title">System Log Console</span>
                    </div>
                    <div className="terminal-body" ref={logTerminalRef}>
                      {chefLogs.map((log, idx) => (
                        <div key={idx} className="terminal-log-line">
                          {log}
                        </div>
                      ))}
                      {isChefLoading && (
                        <div className="terminal-log-line active-prompt">
                          <span className="typing-cursor">█</span>
                        </div>
                      )}
                      {chefLogs.length === 0 && !isChefLoading && (
                        <div className="terminal-empty-text">
                          Console ready. Choose ingredients and click "Generate Recipe" to execute.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Output Card */}
                  <div className="recipe-output-card">
                    {generatedRecipe ? (
                      <div className="recipe-content-wrapper">
                        {renderMarkdown(generatedRecipe)}
                      </div>
                    ) : (
                      <div className="recipe-placeholder">
                        <div className="placeholder-icon">🍲</div>
                        <p>Your recipe instructions will appear here.</p>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
