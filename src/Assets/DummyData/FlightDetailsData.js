import {Images} from '../../helper/IconConstant';

export const FlightDetailsData = [
  {
    id: 1,
    image: Images.handBag,
    text: 'Cabin Beaggage 1 x 7kg',
  },
  {
    id: 2,
    image: Images.luggage,
    text: 'Baggage 1 x 20kg',
  },
  {
    id: 3,
    image: Images.reschedule,
    text: 'Reschedule Available',
  },
  {
    id: 4,
    image: Images.refund,
    text: 'Refundable',
  },
  {
    id: 5,
    image: Images.travelInssurance,
    text: 'Travel Inssurance Included',
  },
];
export const FlightDetailsData1 = [
  {
    id: 1,
    image: Images.meal,
    text: 'Meal availabe',
  },
  {
    id: 2,
    image: Images.entertainment,
    text: 'Entertainment Available',
  },
  {
    id: 3,
    image: Images.wifi,
    text: 'Wi-Fi Available',
  },
  {
    id: 4,
    image: Images.plug,
    text: 'Power/USB Port Available',
  },
  {
    id: 5,
    image: Images.info,
    text: 'Airline',
  },
];

export const RefundableTermsAndConditions = [
  {
    title: 'Acceptable Reasons for Refund:',
    data: [
      {
        id: 1,
        text: 'Medical emergency (illness, serious injury, etc.)',
      },
      {
        id: 2,
        text: 'Self-cancellation (change plan)',
      },
      {
        id: 3,
        text: 'Flight canceled by airline',
      },
      {
        id: 4,
        text: 'Flight significantly rescheduled by airline',
      },
      {
        id: 5,
        text: 'Double booking the same flight',
      },
      {
        id: 6,
        text: 'Pregnancy',
      },
      {
        id: 7,
        text: 'Passenger`s death',
      },
    ],
  },
  {
    title: 'Terms and Conditions for Refund:',
    data: [
      {
        id: 1,
        text: 'Notification: Passengers must notify the airline as soon as possible, providing relevant documentaion to support their refund request.',
      },
      {
        id: 2,
        text: 'Timing: Refund request should be made before the scheduled departure time of the flight.',
      },
      {
        id: 3,
        text: 'Refund Method: Refund will be issued in the original form of payment, and processing times may vary depending on the payment provider.',
      },
      {
        id: 4,
        text: 'Penalties : Depending on the fare type and ailine policy,cancellation or processing.',
      },
    ],
  },
];
export const RescheduleTermsAndConditons = [
  {
    title: 'Acceptable Reasons for Rescheduling:',
    data: [
      {
        id: 1,
        text: 'Change in travel plans',
      },
      {
        id: 2,
        text: 'Personal reasons(terms apply)',
      },
    ],
  },
  {
    title: 'Terms and Conditions for Rescheduling:',
    data: [
      {
        id: 1,
        text: 'Notification: Passengers must notify the airline in advance. typically before the original flight departure time.',
      },
      {
        id: 2,
        text: 'Fare Difference: Passengers may be required to pay the fare difference if the new flight has a higher fare.',
      },
      {
        id: 3,
        text: 'Change Fee: Airline often charge a change fee for rescheduling flights. This fee may vary based on the airline and fare type.',
      },
      {
        id: 4,
        text: 'Validity Period: Rescheduled flight must typically be used within a certain period often within one year of the original booking.',
      },
      {
        id: 5,
        text: 'Seat Availability: Rescheduling is subject to seat availability on the desired new flight.',
      },
      {
        id: 6,
        text: 'Multiple Changes: Airline may limit the number of times a ticket can be rescheduled, and each change may incur additional fees',
      },
    ],
  },
];
