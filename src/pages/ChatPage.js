/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, Button, Typography, Paper, Avatar, Fab } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";
import { css, keyframes } from "@emotion/react";

// אנימציית כניסה להודעות
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const userImageUrl =
    "https://scontent.ftlv1-1.fna.fbcdn.net/v/t39.30808-6/466670338_10234481534240949_4148709394472925320_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=i-KCFnAZhloQ7kNvgG30Eqk&_nc_zt=23&_nc_ht=scontent.ftlv1-1.fna&_nc_gid=AUTAtBK6JCQnCVm_H95E0XP&oh=00_AYAmGC__l90Z6osyMshxMCAiZNhkrg5Hj-pvG4NPtjefnQ&oe=677A1BB1";
  const aiImageUrl =
    "https://scontent.ftlv1-1.fna.fbcdn.net/v/t39.30808-6/461761309_122117399540476224_5786653809398707658_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=W2orhqzfUBoQ7kNvgEyB5-Z&_nc_zt=23&_nc_ht=scontent.ftlv1-1.fna&_nc_gid=AjBKvP8da7aopj9P-mfxrFm&oh=00_AYDd_L5NWt32cm5CR0BorU6Er3APxJlYZuFsRDXQDErvqw&oe=677A2A15";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      const container = chatContainerRef.current;
      if (container) {
        const isAtBottom =
          container.scrollHeight - container.scrollTop <= container.clientHeight + 50;
        setShowScrollButton(!isAtBottom);
      }
    };

    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/chat", {
        message: input,
      });

      const aiMessage = { sender: "ai", text: response.data.response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error communicating with the AI:", error);
      const errorMessage = { sender: "ai", text: "Sorry, something went wrong." };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "95vh",
        backgroundColor: "#f0f4f8",
      }}
    >
      {/* כותרת עמוד */}
      <Box
        sx={{
          width: "100%",
          padding: "20px",
          textAlign: "center",
          backgroundColor: "#1976d2",
          color: "white",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          AI Assistant Chat
        </Typography>
      </Box>

      {/* אזור ההודעות */}
      <Paper
        ref={chatContainerRef}
        sx={{
          width: "90%",
          maxWidth: 600,
          height: "65%",
          overflowY: "auto",
          padding: 2,
          marginY: 2,
          borderRadius: 4,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            css={css`
              animation: ${fadeIn} 0.5s ease-out;
            `}
            sx={{
              display: "flex",
              justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            {message.sender === "ai" && (
              <Avatar
                src={aiImageUrl}
                alt="AI Profile"
                sx={{
                  marginRight: 1,
                  width: 40,
                  height: 40,
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                }}
              />
            )}
            <Box
              sx={{
                maxWidth: "70%",
                padding: 1.5,
                borderRadius: 2,
                backgroundColor: message.sender === "user" ? "#1976d2" : "#e0e0e0",
                color: message.sender === "user" ? "white" : "black",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                fontSize: "14px",
              }}
            >
              {message.text}
            </Box>
            {message.sender === "user" && (
              <Avatar
                src={userImageUrl}
                alt="User Profile"
                sx={{
                  marginLeft: 1,
                  width: 40,
                  height: 40,
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                }}
              />
            )}
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Paper>

      {/* תיבת טקסט להזנת הודעות */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "90%",
          maxWidth: 600,
          marginBottom: 2,
          backgroundColor: "white",
          borderRadius: 4,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          padding: 1,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            marginLeft: 1,
            borderRadius: "20px",
            paddingX: 3,
            fontWeight: "bold",
            backgroundColor: "#1976d2",
          }}
          onClick={sendMessage}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatPage;
