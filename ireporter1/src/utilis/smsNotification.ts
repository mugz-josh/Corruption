import type { ReportStatus } from '../types';

/**
 * Send SMS notification when report status changes
 * Connect this to your backend SMS service (Twilio, etc.)
 * 
 * @param phone - User's phone number
 * @param reportId - ID of the report
 * @param newStatus - New status of the report
 * @param reportTitle - Title of the report
 */
export const sendStatusChangeSMS = async (
  phone: string,
  reportId: string,
  newStatus: ReportStatus,
  reportTitle: string
): Promise<void> => {
  // TODO: Connect to your backend API endpoint
  // Example implementation:
  /*
  try {
    const response = await fetch('YOUR_BACKEND_API_URL/send-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone,
        message: `Your report "${reportTitle}" (ID: ${reportId}) status changed to: ${newStatus.replace('-', ' ').toUpperCase()}`,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to send SMS');
    }
  } catch (error) {
    console.error('SMS notification error:', error);
    throw error;
  }
  */
  
  // Placeholder - log for now
  console.log('SMS Notification:', {
    phone,
    reportId,
    newStatus,
    message: `Your report "${reportTitle}" (ID: ${reportId}) status changed to: ${newStatus.replace('-', ' ').toUpperCase()}`,
  });
};