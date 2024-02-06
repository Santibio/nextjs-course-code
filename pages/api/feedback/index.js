import fs from "fs"
import path from "path";

export function getFeedbackPath() {
    return path.join(process.cwd(), "data", "feedback.json")
}
export function getFeedbackData(filePath) {
    const fileData = fs.readFileSync(filePath)
    const data = JSON.parse(fileData)
    return data
}

function feedback(req, res) {
    if (req.method === "POST") {
        console.log('req.body: ', req.body);
        const { email, feedback } = req.body

        const newFeedback = {
            id: new Date().toISOString(),
            email,
            feedback
        }
        const filePath = getFeedbackPath()
        const data = getFeedbackData(filePath)
        data.push(newFeedback)
        fs.writeFileSync(filePath, JSON.stringify(data))
        res.status(201).send({ message: "success", newFeedback })
    } else {
        const filePath = getFeedbackPath()
        const data = getFeedbackData(filePath)

        res.status(201).send({ message: "success", feedbacks: data })
    }
}

export default feedback