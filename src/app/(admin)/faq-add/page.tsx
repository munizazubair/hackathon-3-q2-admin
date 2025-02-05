"use client";
import Alert from '@/components/alert';
import { NextResponse } from 'next/server';
import { useState, useEffect } from 'react';

interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

const FAQAdd = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [visible , setVisibility] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Fetch FAQs on page load
  useEffect(() => {
    const fetchFAQs = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/faq');
        const data = await response.json();
        setFaqs(data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs(); // Call the function inside useEffect
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    const faqData = editingFAQ
      ? { _id: editingFAQ._id, question, answer } // If updating, send the _id
      : { question, answer };
  
    try {
      const method = editingFAQ ? "PUT" : "POST"; // PUT for updates, POST for new
      const response = await fetch("/api/faq", {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(faqData),
      });
  
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to save FAQ");
      }
  
      setQuestion("");
      setAnswer("");
      setEditingFAQ(null);
  
      // Fetch the updated FAQ list
      const updatedFAQs = await fetch("/api/faq").then((res) => res.json());
      setFaqs(updatedFAQs);
  
      setAlertMessage(editingFAQ ? "Answer updated successfully" : "Answer added successfully");

    } catch (error: unknown) {
        if (error instanceof Error) {
          return NextResponse.json({ message: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
      }
  };

  const handleDelete = async (id: string) => {    
    setIsDeleting(true);
    try {
      const response = await fetch('/api/faq', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ faqId: id }), // Sending faqId for DELETE
      });

      if (response.ok) {
        setFaqs(faqs.filter((faq: FAQ) => faq._id !== id)); // Remove deleted FAQ from state
        setAlertMessage('FAQ deleted successfully');
      } else {
        setAlertMessage('Failed to delete FAQ');
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      setAlertMessage('Error deleting FAQ');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFAQ(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
  };

  if (loading) {
    return <div>Loading FAQs...</div>;
  }

  const clearForm = () => {
    setQuestion("");
    setAnswer("");
  };

  const handleVisibility = () => {
  setVisibility(visible => !visible)
}
const handleCloseAlert = () => {
  setAlertMessage(null);
};

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Frequently Asked Questions</h1>
      {visible ? 
      <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Question:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Answer:</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
          />
        </div>
        <div className='flex gap-1'>
        <button className="bg-color12 text-white p-2 px-4 rounded-md" onClick={() => {handleVisibility(); clearForm()}}>Cancel</button>
        <button 
          type="submit"
          className="bg-color text-white p-2 px-4 rounded-md"
          disabled={loading}
        >
          {loading ? 'Saving...' : editingFAQ ? 'Update Answer' : 'Add Answer'}
        </button>
        </div>
        
      </form>
      :""
}
      <h2 className="text-xl font-semibold mt-6">FAQ List</h2>
      <ul className="space-y-4 mt-4">
        {faqs.map((faq: FAQ) => (
          <li key={faq._id} className="bg-gray-100 p-4 rounded-md shadow-sm">
            <h3 className="font-semibold text-gray-800">{faq.question}</h3>
            <p className="text-gray-600 mt-2">{faq.answer}</p>
            <div className="mt-4 flex gap-2">
              <button onClick={() => {handleEdit(faq); handleVisibility()}} className="bg-color text-white p-2 rounded-md">Add Answer</button>
              <button onClick={() => handleDelete(faq._id)} className="bg-color16 text-white p-2 rounded-md" disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div>
      {alertMessage && (
              <Alert message={alertMessage} onClose={handleCloseAlert} />

            )}
      </div>
    </div>
  );
};

export default FAQAdd;
