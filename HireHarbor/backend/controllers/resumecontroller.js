const { predictSkills } = require('../models/resumemodel');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const knownSkillsDb = require('../data/knownSkills.json');

// Helper: Extract text from the resume based on its MIME type.
async function extractText(buffer, mimetype) {
  try {
    if (mimetype === 'application/pdf') {
      const data = await pdfParse(buffer);
      return data.text;
    } else if (
      mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      mimetype === 'application/msword'
    ) {
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    } else {
      return buffer.toString();
    }
  } catch (err) {
    console.error("Text extraction error:", err);
    return "";
  }
}

exports.uploadResume = async (req, res) => {
  try {
    const { name, email, skills } = req.body;
    const resumeBuffer = req.file ? req.file.buffer : null;
    const mimetype = req.file ? req.file.mimetype : null;

    if (!resumeBuffer) {
      return res.status(400).json({ error: "No resume file uploaded." });
    }

    // Extract text from the resume.
    const resumeText = await extractText(resumeBuffer, mimetype);
    
    // Use NLP to extract skills from the resume text.
    const extractedSkills = await predictSkills(resumeText);
    
    // Process user-entered skills (if any; expected as comma-separated).
    const inputSkills = skills ? skills.split(',').map(s => s.trim()).filter(Boolean) : [];
    
    // Combine the scanned (extracted) skills with input skills.
    const combinedSkills = Array.from(new Set([...inputSkills, ...extractedSkills]));
    
    // Dummy job matching based on combined skills.
    const jobs = simulateJobMatching(combinedSkills);
    
    // Return full analysis including known skills for dropdown.
    res.json({
      name,
      email,
      inputSkills,
      scannedSkills: extractedSkills,
      combinedSkills,
      resumeText,
      jobs,
      allKnownSkills: knownSkillsDb.skills
    });
  } catch (error) {
    console.error("Error in uploadResume:", error);
    res.status(500).json({ error: "Error processing resume." });
  }
};

function simulateJobMatching(skills) {
  // Example job data (replace with real database/API logic).
  const availableJobs = [
    { id: 1, title: 'Frontend Developer', requiredSkills: ['javascript', 'react', 'html', 'css'] },
    { id: 2, title: 'Backend Developer', requiredSkills: ['node.js', 'express', 'mongodb'] },
    { id: 3, title: 'Full Stack Developer', requiredSkills: ['javascript', 'node.js', 'react'] },
    { id: 4, title: 'Data Scientist', requiredSkills: ['python', 'machine learning', 'data analysis'] }
  ];
  
  return availableJobs.filter(job =>
    job.requiredSkills.some(skill =>
      skills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
    )
  );
}
