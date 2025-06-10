const nlp = require('compromise');
const knownSkillsDb = require('../data/knownSkills.json');

// Utility to clean and normalize text.
function cleanText(text) {
  return text.replace(/\s+/g, ' ').trim().toLowerCase();
}

// Utility to escape regex special characters in a string.
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function predictSkills(text) {
  try {
    const cleanedText = cleanText(text);
    
    // Use compromise to extract topics; fallback to nouns.
    let doc = nlp(cleanedText);
    let topics = doc.topics().out('array');
    if (!topics || topics.length === 0) {
      topics = doc.nouns().out('array');
    }
    let extractedFromNLP = topics.map(t => t.trim().toLowerCase()).filter(t => t.length > 1);
    
    // Use known skills database to scan the text.
    let dictionarySkills = [];
    knownSkillsDb.skills.forEach(skill => {
      // Escape special regex characters in the skill.
      const escapedSkill = escapeRegex(skill);
      // Create regex with word boundaries.
      const regex = new RegExp(`\\b${escapedSkill}\\b`, 'i');
      if (regex.test(cleanedText)) {
        dictionarySkills.push(skill);
      }
    });
    
    // Merge and deduplicate.
    let combined = [...extractedFromNLP, ...dictionarySkills];
    let uniqueSkills = Array.from(new Set(combined));
    
    // Filter out generic terms.
    uniqueSkills = uniqueSkills.filter(skill => !isGenericTerm(skill));
    
    return uniqueSkills;
  } catch (err) {
    console.error("Refined NLP extraction error:", err);
    return [];
  }
}

function isGenericTerm(term) {
  const genericTerms = [
    'resume', 'curriculum', 'vitae', 'experience', 'skills', 'profile',
    'details', 'education', 'work', 'projects', 'professional'
  ];
  return genericTerms.includes(term);
}

module.exports = {
  predictSkills
};
