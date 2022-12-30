import './index.css'

const FaqItem = props => {
  const {faqItem} = props
  const {qno, question, answer} = faqItem

  return (
    <li className="faq-item">
      <p className="question">{`${qno}. ${question}`}</p>
      <p className="answer ">{answer}</p>
    </li>
  )
}

export default FaqItem
