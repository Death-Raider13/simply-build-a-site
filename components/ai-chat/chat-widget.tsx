"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

const predefinedQuestions = [
  "How do I track my order?",
  "What payment methods do you accept?",
  "How do I become a vendor?",
  "What are your shipping rates?",
  "How do I return an item?",
]

const aiResponses: Record<string, string> = {
  track:
    "To track your order, go to the 'Track Order' page and enter your tracking number. You can find this in your order confirmation email. We use Nigerian logistics partners like GIG Logistics for reliable delivery across all 36 states.",
  payment:
    "We accept various Nigerian payment methods including: Bank transfers, Debit/Credit cards, USSD payments, and mobile money. All payments are processed securely through Paystack and Flutterwave.",
  vendor:
    "To become a vendor, click 'Become a Vendor' in the header menu. You'll need to provide your business details, CAC registration (optional), and select your product categories. Our team reviews applications within 2-3 business days.",
  shipping:
    "Shipping rates vary by location: Lagos/Abuja: ₦1,500, Other states: ₦2,000-3,500. Free shipping on orders over ₦10,000. Delivery typically takes 2-5 business days depending on your location.",
  return:
    "You can return items within 7 days of delivery. Items must be in original condition. Contact the vendor directly or use our dispute resolution system. Refunds are processed within 5-7 business days.",
  default:
    "I'm here to help with questions about KNITTED_GOURMET Nigeria! You can ask me about orders, payments, shipping, becoming a vendor, returns, or any other platform-related questions.",
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "Hello! I'm your KNITTED_GOURMET Nigeria assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("track") || message.includes("order") || message.includes("delivery")) {
      return aiResponses.track
    } else if (message.includes("payment") || message.includes("pay") || message.includes("card")) {
      return aiResponses.payment
    } else if (message.includes("vendor") || message.includes("sell") || message.includes("business")) {
      return aiResponses.vendor
    } else if (message.includes("ship") || message.includes("delivery") || message.includes("cost")) {
      return aiResponses.shipping
    } else if (message.includes("return") || message.includes("refund") || message.includes("exchange")) {
      return aiResponses.return
    } else {
      return aiResponses.default
    }
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: generateResponse(content),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question)
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card
      className={`fixed bottom-6 right-6 w-96 shadow-xl z-50 border-green-200 ${isMinimized ? "h-16" : "h-[500px]"}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-green-600 text-white rounded-t-lg">
        <CardTitle className="text-sm font-medium flex items-center space-x-2">
          <Bot className="h-4 w-4" />
          <span>KNITTED_GOURMET Assistant</span>
        </CardTitle>
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-white hover:bg-green-700"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-white hover:bg-green-700"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="flex flex-col h-[calc(500px-80px)] p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === "user" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === "bot" && <Bot className="h-4 w-4 mt-0.5 text-green-600" />}
                    {message.type === "user" && <User className="h-4 w-4 mt-0.5" />}
                    <div className="text-sm">{message.content}</div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-green-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="p-3 border-t bg-gray-50">
            <div className="text-xs text-gray-600 mb-2">Quick questions:</div>
            <div className="flex flex-wrap gap-1">
              {predefinedQuestions.slice(0, 3).map((question, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-green-50 hover:border-green-200 text-xs"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </Badge>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                className="flex-1"
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                size="icon"
                className="bg-green-600 hover:bg-green-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
