"use client";

import {
  Box,
  FormControl,
  IconButton,
  Paper,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useCourse } from "@/lib/context/useCourse";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";

interface IChatInputData {
  id: string;
  nome: string;
  curso: string | null;
  materia: string | null;
  mensagem_usuario: string;
}

const API_URL = "/api/chat";

export function ChatInput() {
  const userId = useRef(uuidv4());
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { text: string; role: "user" | "assistant" }[]
  >([]);
  const userName = "joao";
  const { selectedCourse, selectedDiscipline } = useCourse();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // CORREÇÃO 2: Controla o envio da primeira mensagem para evitar duplicação.
  const isFirstMessageSent = useRef(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!selectedCourse || !selectedDiscipline) {
      redirect("/selecionar_disciplina");
    }
  }, [selectedCourse, selectedDiscipline]);

  useEffect(() => {
    // CORREÇÃO 2: Garante que a primeira mensagem seja enviada apenas uma vez.
    if (!isFirstMessageSent.current && selectedCourse && selectedDiscipline) {
      sendMessage("First message");
      isFirstMessageSent.current = true; // Marca como enviado.
    }
  }, [selectedCourse, selectedDiscipline]); // Dependências corretas.

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (messageText: string) => {
    const isFirstMsg = messageText.trim() === "First message";
    
    // Adiciona a mensagem do usuário à tela (exceto a primeira mensagem automática).
    if (!isFirstMsg) {
      setMessages((prev) => [...prev, { role: "user", text: messageText }]);
    }
    
    setInput("");
    setIsLoading(true);

    const payload: IChatInputData = {
      id: userId.current,
      nome: userName,
      curso: selectedCourse,
      materia: selectedDiscipline,
      mensagem_usuario: messageText,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`A requisição falhou: ${response.status} - ${errorText}`);
      }

      const data = await response.text();
      
      // CORREÇÃO 3: Adiciona a mensagem de boas-vindas inicial.
      if (isFirstMsg) {
          setMessages([{ role: "assistant", text: data }]);
      } else {
          setMessages((prev) => [...prev, { role: "assistant", text: data }]);
      }

    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Desculpe, ocorreu um erro ao conectar. Por favor, tente novamente.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    await sendMessage(input);
  };

  return (
    <Box
      sx={{
        width: "100%",
        flexGrow: 1,
        backgroundColor: "neutral.100",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", // Alinha o conteúdo ao topo.
        alignItems: "center",
        p: { xs: 2, sm: 3 },
        // CORREÇÃO 1: Define uma altura calculada para ocupar o espaço restante.
        height: "calc(100vh - 80px)", // Assumindo que seu Header tem 80px de altura.
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "1024px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
          border: "1px solid",
          borderColor: "neutral.200",
          overflow: "hidden",
          backgroundColor: "neutral.000",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: { xs: 2, md: 3 },
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* CORREÇÃO 3: Adiciona a mensagem inicial de boas-vindas */}
          {messages.length === 0 && isLoading && (
             <Typography sx={{ textAlign: 'center', color: 'neutral.500' }}>
                Conectando com o tutor...
             </Typography>
          )}

          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent:
                  msg.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: "12px 16px",
                  borderRadius: "12px",
                  maxWidth: "80%",
                  backgroundColor:
                    msg.role === "user" ? "primary.main" : "neutral.200",
                  color: msg.role === "user" ? "white" : "neutral.700",
                  "& a": {
                    color: msg.role === "user" ? "white" : "primary.main",
                    textDecoration: "underline",
                  },
                }}
              >
                <Typography
                  component="div"
                  variant="body1"
                  sx={{
                    "& p": { margin: 0 },
                    "& ol, & ul": { pl: 2, my: 1 },
                  }}
                >
                  <Markdown remarkPlugins={[remarkGfm]}>{msg.text}</Markdown>
                </Typography>
              </Paper>
            </Box>
          ))}
          {/* Adiciona um indicador de "digitando..." */}
          {isLoading && messages.length > 0 && (
            <Typography sx={{ fontStyle: 'italic', color: 'neutral.500', ml: 2 }}>
                Simpático está digitando...
            </Typography>
          )}
          <div ref={messagesEndRef} />
        </Box>

        <Box
          sx={{
            p: { xs: 2, md: 3 },
            borderTop: "1px solid",
            borderColor: "neutral.200",
            backgroundColor: "neutral.000",
          }}
        >
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <TextField
                fullWidth
                variant="outlined"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pergunte ao Simpatico..."
                disabled={isLoading}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "neutral.100",
                    "& fieldset": {
                      borderColor: "neutral.200",
                    },
                    "&:hover fieldset": {
                      borderColor: "primary.main",
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="submit"
                        color="primary"
                        disabled={!input.trim() || isLoading}
                        sx={{
                          backgroundColor: "primary.main",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "primary.dark",
                          },
                          "&.Mui-disabled": {
                            backgroundColor: "neutral.200",
                          },
                        }}
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </form>
        </Box>
      </Paper>
    </Box>
  );
}
