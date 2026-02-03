'use client';

import React, { useState, useEffect } from 'react';
import { Mic, Square, Volume2, Loader2, Sparkles, MessageCircle, X } from 'lucide-react';
import { useTamboVoice } from '@tambo-ai/react';
import { processVoiceCommand, sampleVoiceCommands } from '@/lib/utils/voiceCommands';

interface ConversationMessage {
  id: string;
  type: 'user' | 'yoda';
  text: string;
  timestamp: Date;
  action?: string;
}

export default function YodaVoiceInterface() {
  const {
    startRecording,
    stopRecording,
    isRecording,
    isTranscribing,
    transcript,
    transcriptionError,
  } = useTamboVoice();

  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastProcessedTranscript, setLastProcessedTranscript] = useState('');

  useEffect(() => {
    if (transcript && transcript !== lastProcessedTranscript && !isRecording) {
      setLastProcessedTranscript(transcript);
      handleVoiceCommand(transcript);
    }
  }, [transcript, isRecording, lastProcessedTranscript]);

  const handleVoiceCommand = async (command: string) => {
    // Add user message
    const userMessage: ConversationMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      text: command,
      timestamp: new Date(),
    };
    setConversation(prev => [...prev, userMessage]);

    // Process command
    setIsProcessing(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const result = processVoiceCommand(command);
    
    // Add Yoda response
    const yodaMessage: ConversationMessage = {
      id: `yoda-${Date.now()}`,
      type: 'yoda',
      text: result.response,
      timestamp: new Date(),
      action: result.action,
    };
    setConversation(prev => [...prev, yodaMessage]);
    setIsProcessing(false);

    // Speak response if supported
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(result.response);
      utterance.rate = 0.85;
      utterance.pitch = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStartRecording = () => {
    setLastProcessedTranscript('');
    startRecording();
  };

  const handleSampleCommand = (command: string) => {
    handleVoiceCommand(command);
  };

  const clearConversation = () => {
    setConversation([]);
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-500/20 rounded-xl">
            <Volume2 className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Yoda Voice Banking
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
            </h2>
            <p className="text-gray-400 text-sm">Speak to Master Yoda, you may</p>
          </div>
        </div>
        {conversation.length > 0 && (
          <button
            onClick={clearConversation}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        )}
      </div>

      {/* Voice Controls */}
      <div className="flex flex-col items-center mb-6 p-6 bg-slate-900/50 rounded-xl border border-slate-700/30">
        {isTranscribing ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-12 h-12 text-blue-400 animate-spin" />
            <p className="text-gray-300 text-sm">Transcribing your words, I am...</p>
          </div>
        ) : isRecording ? (
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={stopRecording}
              className="p-6 bg-red-500/20 hover:bg-red-500/30 rounded-full border-2 border-red-500 transition-all"
            >
              <Square className="w-12 h-12 text-red-500 fill-current animate-pulse" />
            </button>
            <p className="text-red-400 text-sm font-medium animate-pulse">Recording... Click to stop</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={handleStartRecording}
              className="p-6 bg-blue-500/20 hover:bg-blue-500/30 rounded-full border-2 border-blue-500 transition-all hover:scale-105"
            >
              <Mic className="w-12 h-12 text-blue-400" />
            </button>
            <p className="text-gray-300 text-sm">Tap to speak to Yoda</p>
          </div>
        )}

        {transcriptionError && (
          <p className="text-red-400 text-sm mt-2">{transcriptionError}</p>
        )}
      </div>

      {/* Conversation History */}
      {conversation.length > 0 && (
        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
          {conversation.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-blue-500/20 border border-blue-500/30 text-blue-100'
                    : 'bg-green-500/20 border border-green-500/30 text-green-100'
                }`}
              >
                <div className="flex items-start gap-2 mb-1">
                  {message.type === 'yoda' && (
                    <Sparkles className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                  )}
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
                <p className="text-xs opacity-60 mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-green-400 animate-spin" />
                  <p className="text-green-300 text-sm">Thinking, Yoda is...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sample Commands */}
      {conversation.length === 0 && (
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle className="w-5 h-5 text-gray-400" />
            <p className="text-gray-400 text-sm font-medium">Try asking:</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sampleVoiceCommands.map((command, index) => (
              <button
                key={index}
                onClick={() => handleSampleCommand(command)}
                className="text-left p-3 bg-slate-900/50 hover:bg-slate-900/70 rounded-lg border border-slate-700/30 hover:border-blue-500/30 transition-all text-sm text-gray-300 hover:text-white"
              >
                "{command}"
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Info Banner */}
      <div className="mt-6 bg-green-500/10 border border-green-500/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Volume2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-white font-medium mb-1">Voice Banking Active</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Ask Yoda about your spending, savings, bills, goals, or request actions. 
              Voice responses enabled, they are.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}