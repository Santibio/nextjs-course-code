import React, { useRef, useState } from 'react'
import { getFeedbackData, getFeedbackPath } from '../api/feedback'
import { useRouter } from 'next/router'


const FeedbackPage = ({ feedbacks }) => {

    const emailInput = useRef()
    const feedbackInput = useRef()
    const router = useRouter()

    const [feedbackList, setFeedbackList] = useState(feedbacks)

    function getFeedbacks() {

        fetch("/api/feedback", {
            method: "GET",
        })
            .then(response => response.json())
            .then(data => setFeedbackList(data.feedbacks))
    }

    function sumitForm(e) {
        e.preventDefault()

        const enteredEmail = emailInput.current.value
        const enteredFeedback = feedbackInput.current.value

        fetch("/api/feedback", {
            method: "POST",
            body: JSON.stringify({ email: enteredEmail, feedback: enteredFeedback }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                alert("Created!")
                getFeedbacks()
            })
    }

    function showDetailHandler(id) {
        console.log('id: ', id);
        router.push(`feedback/${id}`)

    }
    return (
        <div>
            <section>
                <h2>Create</h2>
                <form>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input type="email" name="email" id="email" ref={emailInput} />
                    </div>
                    <div>
                        <label htmlFor='feedback'>Feedback</label>
                        <textarea name="feedback" id="feedback" rows="5" ref={feedbackInput} />
                    </div>
                    <div>
                        <button onClick={sumitForm}>Submit</button>
                    </div>
                </form>
            </section>
            <hr />
            <section>
                <h2>List</h2>
                <ul>
                    {feedbackList.map(f => (<li key={f.id}>
                        <div>
                            <h4>{f.email} - {f.feedback}</h4>
                            <button onClick={showDetailHandler.bind(null,f.id)}>Show detail</button>

                        </div>

                    </li>))}
                </ul>
            </section>

        </div>
    )
}

export async function getStaticProps() {

    const filePath = getFeedbackPath()
    const data = getFeedbackData(filePath)

    return {
        props: {
            feedbacks: data
        }
    }
}

export default FeedbackPage