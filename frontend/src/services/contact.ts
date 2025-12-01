import api from './api'
import type { ContactForm, ApiResponse } from '../types/api'

export async function sendContactMessage(data: ContactForm): Promise<ApiResponse<null>> {
  const response = await api.post<ApiResponse<null>>('/contact', data)
  return response.data
}

// For development/testing when backend is not available
export async function sendContactMessageMock(data: ContactForm): Promise<ApiResponse<null>> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))
  
  console.log('Contact form submitted:', data)
  
  return {
    data: null,
    message: 'Mensaje enviado correctamente. Te responderé pronto!',
    success: true,
  }
}
