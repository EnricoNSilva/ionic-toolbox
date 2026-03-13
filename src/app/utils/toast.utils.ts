import { ToastController } from '@ionic/angular/standalone';

export async function showTopToast(
  toastCtrl: ToastController,
  message: string,
  color: 'danger' | 'success' | 'warning' | 'primary' = 'danger',
  duration = 3500,
): Promise<void> {
  const toast = await toastCtrl.create({
    message,
    duration,
    color,
    position: 'top',
  });

  await toast.present();
}
