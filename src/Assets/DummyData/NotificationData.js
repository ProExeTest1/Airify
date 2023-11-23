import {Images} from '../../helper/IconConstant';

export const NotificationData = [
  {
    data: [
      {
        id: 1,
        title: 'New Feature Alert!',
        discription:
          'Discover exciting new app features. Enhance your travel experience  today!',
        image: Images.checkBox_tickMark,
      },
    ],
    time: 'Today',
  },
  {
    time: 'Yesterday',
    data: [
      {
        id: 2,
        title: 'Enable 2-Factor Authentication',
        discription:
          'Use 2-factor authentication for multiple layers security on your account.',
        image: Images.security,
      },
      {
        id: 3,
        title: 'Your Flight Update!',
        discription: 'Flight to Tokyo (HND) on time at gate B12. Safe travels!',
        image: Images.aeroplane,
        ticket: 'update',
      },
    ],
  },
  {
    time: 'Dec 20, 2023',
    data: [
      {
        id: 4,
        title: 'Eclusive Offer Unlocked!',
        discription:
          'Congrats! You have unlocked a 15% discount on your next flight booking with Airify. Start planning your adventure today!',
        image: Images.discount,
      },
      {
        id: 5,
        title: 'Multiple Payment Updates!',
        discription:
          'Now you can add a credit card for flight tickets payments.',
        image: Images.payments,
        time: 'Dec 20, 2023',
      },
    ],
  },
];
export const FrenchNotificationData = [
  {
    data: [
      {
        id: 1,
        title: 'Alerte nouvelle fonctionnalité !',
        description:
          "Découvrez les nouvelles fonctionnalités passionnantes de l'application. Améliorez votre expérience de voyage dès aujourd'hui !",
        image: Images.checkBox_tickMark,
      },
    ],
    time: "Aujourd'hui",
  },
  {
    time: 'Hier',
    data: [
      {
        id: 2,
        title: "Activer l'authentification à deux facteurs",
        description:
          "Utilisez l'authentification à deux facteurs pour une sécurité renforcée de votre compte.",
        image: Images.security,
      },
      {
        id: 3,
        title: 'Mise à jour de votre vol !',
        description:
          "Vol pour Tokyo (HND) à l'heure à la porte B12. Bon voyage !",
        image: Images.aeroplane,
        ticket: 'update',
      },
    ],
  },
  {
    time: '20 décembre 2023',
    data: [
      {
        id: 4,
        title: 'Offre exclusive débloquée !',
        description:
          "Félicitations ! Vous avez débloqué une remise de 15 % sur votre prochaine réservation de vol avec Airify. Commencez à planifier votre aventure dès aujourd'hui !",
        image: Images.discount,
      },
      {
        id: 5,
        title: 'Mises à jour de paiement multiples !',
        description:
          "Vous pouvez maintenant ajouter une carte de crédit pour les paiements des billets d'avion.",
        image: Images.payments,
        time: '20 décembre 2023',
      },
    ],
  },
];
