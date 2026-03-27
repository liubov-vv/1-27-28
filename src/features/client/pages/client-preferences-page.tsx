"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SuccessMessage } from "@/features/auth/components/success-message";

export function ClientPreferencesPage() {
  const [emailCampaigns, setEmailCampaigns] = useState(true);
  const [serviceUpdates, setServiceUpdates] = useState(true);
  const [saved, setSaved] = useState(false);

  if (saved) {
    return <div className="py-8"><SuccessMessage title="Настройки сохранены" description="Параметры подписки обновлены." /></div>;
  }

  return (
    <div className="space-y-6 py-8">
      <h1 className="text-3xl font-semibold tracking-tight">Email Preferences</h1>
      <Card className="p-5 space-y-4">
        <label className="flex items-center justify-between gap-3">
          <span className="text-sm">Кампании и предложения</span>
          <input type="checkbox" checked={emailCampaigns} onChange={(e) => setEmailCampaigns(e.target.checked)} />
        </label>
        <label className="flex items-center justify-between gap-3">
          <span className="text-sm">Обновления по услугам</span>
          <input type="checkbox" checked={serviceUpdates} onChange={(e) => setServiceUpdates(e.target.checked)} />
        </label>
        <Button onClick={() => setSaved(true)}>Сохранить</Button>
      </Card>
    </div>
  );
}

