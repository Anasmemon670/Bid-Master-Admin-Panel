import React from 'react';
import { Card, CardContent } from './ui/card';
export function StatsCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  iconColor = 'bg-blue-500'
}) {
  return /*#__PURE__*/React.createElement(Card, {
    className: "hover:shadow-lg transition-shadow"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 dark:text-gray-400 mb-1"
  }, title), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 dark:text-white mb-2"
  }, value), change && /*#__PURE__*/React.createElement("p", {
    className: `text-xs ${changeType === 'positive' ? 'text-green-600' : changeType === 'negative' ? 'text-red-600' : 'text-gray-600'}`
  }, change)), /*#__PURE__*/React.createElement("div", {
    className: `w-12 h-12 ${iconColor} rounded-lg flex items-center justify-center`
  }, /*#__PURE__*/React.createElement(Icon, {
    className: "h-6 w-6 text-white"
  })))));
}