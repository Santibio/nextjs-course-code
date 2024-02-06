import { getFeedbackData, getFeedbackPath } from ".";

function handler(req, res) {
    const { feedbackId } = req.query
    const filePath = getFeedbackPath()
    const data = getFeedbackData(filePath)
    const filteredFeedback = data.find(f => f.id === feedbackId)
    res.send({ feedback: filteredFeedback })
}

export default handler