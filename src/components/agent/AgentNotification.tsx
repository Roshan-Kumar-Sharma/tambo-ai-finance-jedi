'use client';

import React, { useEffect, useState } from 'react';
import { Bot, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
}

export default function AgentNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate real-time notifications
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'success',
        title: 'Bill Paid Successfully',
        message: 'R2-D2 automatically paid your Internet bill ($65.00)',
        timestamp: new Date(),
      },
    ];

    // Add initial notification after 2 seconds
    const timer = setTimeout(() => {
      setNotifications(mockNotifications);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-400" />;
      default:
        return <Bot className="w-5 h-5 text-gray-400" />;
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-green-500/30';
      case 'warning':
        return 'border-yellow-500/30';
      case 'info':
        return 'border-blue-500/30';
      default:
        return 'border-gray-500/30';
    }
  };

  if (!isVisible || notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`bg-slate-900 border ${getBorderColor(notification.type)} rounded-xl p-4 shadow-2xl animate-in slide-in-from-right duration-300`}
        >
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="flex-shrink-0 mt-0.5">
              {getIcon(notification.type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Bot className="w-4 h-4 text-blue-400" />
                <h4 className="text-white font-semibold text-sm">
                  {notification.title}
                </h4>
              </div>
              <p className="text-gray-400 text-sm">
                {notification.message}
              </p>
              <p className="text-gray-600 text-xs mt-2">
                {notification.timestamp.toLocaleTimeString()}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => removeNotification(notification.id)}
              className="flex-shrink-0 p-1 hover:bg-slate-800 rounded transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Progress Bar for Auto-dismiss */}
          <div className="mt-3 w-full bg-gray-800 rounded-full h-1 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-full animate-progress"
              style={{
                animation: 'progress 5s linear forwards',
              }}
            />
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}