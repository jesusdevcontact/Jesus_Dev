import { ChatbotNode } from '../models/portfolio.models';
import { socialLinks } from './portfolio.content';

export const chatbotNodes: readonly ChatbotNode[] = [
  {
    id: 'welcome',
    messageKey: 'chatbot.messages.welcome',
    actions: [
      {
        type: 'node',
        labelKey: 'chatbot.actions.currentProjects',
        targetNodeId: 'projects',
      },
      {
        type: 'node',
        labelKey: 'chatbot.actions.mainStack',
        targetNodeId: 'stack',
      },
      {
        type: 'node',
        labelKey: 'chatbot.actions.professionalExperience',
        targetNodeId: 'experience',
      },
      {
        type: 'node',
        labelKey: 'chatbot.actions.availability',
        targetNodeId: 'availability',
      },
      {
        type: 'node',
        labelKey: 'chatbot.actions.clientProjects',
        targetNodeId: 'services',
      },
      {
        type: 'node',
        labelKey: 'chatbot.actions.contactJesus',
        targetNodeId: 'contact',
      },
    ],
  },
  {
    id: 'projects',
    messageKey: 'chatbot.messages.projects',
    actions: [
      {
        type: 'route',
        labelKey: 'chatbot.actions.viewGibora',
        route: '/projects/gibora',
      },
      {
        type: 'route',
        labelKey: 'chatbot.actions.viewAllProjects',
        route: '/',
        fragment: 'projects',
      },
      {
        type: 'node',
        labelKey: 'chatbot.actions.backHome',
        targetNodeId: 'welcome',
      },
    ],
  },
  {
    id: 'stack',
    messageKey: 'chatbot.messages.stack',
    actions: [
      {
        type: 'route',
        labelKey: 'chatbot.actions.viewFullStack',
        route: '/',
        fragment: 'stack',
      },
      {
        type: 'route',
        labelKey: 'chatbot.actions.viewProjects',
        route: '/',
        fragment: 'projects',
      },
      {
        type: 'node',
        labelKey: 'chatbot.actions.backHome',
        targetNodeId: 'welcome',
      },
    ],
  },
  {
    id: 'experience',
    messageKey: 'chatbot.messages.experience',
    actions: [
      {
        type: 'route',
        labelKey: 'chatbot.actions.viewExperience',
        route: '/',
        fragment: 'journey',
      },
      {
        type: 'route',
        labelKey: 'chatbot.actions.viewPegasus',
        route: '/projects/pegasus-medical',
      },
      {
        type: 'node',
        labelKey: 'chatbot.actions.backHome',
        targetNodeId: 'welcome',
      },
    ],
  },
  {
    id: 'availability',
    messageKey: 'chatbot.messages.availability',
    actions: [
      {
        type: 'route',
        labelKey: 'chatbot.actions.goContact',
        route: '/contact',
      },
      {
        type: 'route',
        labelKey: 'chatbot.actions.viewExperience',
        route: '/',
        fragment: 'journey',
      },
      {
        type: 'route',
        labelKey: 'chatbot.actions.viewProjects',
        route: '/',
        fragment: 'projects',
      },
    ],
  },
  {
    id: 'services',
    messageKey: 'chatbot.messages.services',
    actions: [
      {
        type: 'route',
        labelKey: 'chatbot.actions.tellProject',
        route: '/contact',
      },
      {
        type: 'route',
        labelKey: 'chatbot.actions.viewContact',
        route: '/contact',
      },
      {
        type: 'node',
        labelKey: 'chatbot.actions.backHome',
        targetNodeId: 'welcome',
      },
    ],
  },
  {
    id: 'contact',
    messageKey: 'chatbot.messages.contact',
    actions: [
      {
        type: 'route',
        labelKey: 'chatbot.actions.goContact',
        route: '/contact',
      },
      {
        type: 'external',
        labelKey: 'chatbot.actions.linkedin',
        url: socialLinks.linkedin,
      },
      {
        type: 'external',
        labelKey: 'chatbot.actions.github',
        url: socialLinks.github,
      },
    ],
  },
];
