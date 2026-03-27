"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AudienceSelector } from "./audience-selector";
import { SuccessMessage } from "@/features/auth/components/success-message";

export function CampaignEditor() {
  const [title, setTitle] = useState("");
  const [audience, setAudience] = useState("Active clients");
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState(false);

  if (saved) {
    return <SuccessMessage title="Кампания сохранена" description="Демо-режим: кампания готова к отправке." />;
  }

  return (
    <Card className="p-5 space-y-4">
      <div className="text-sm font-semibold">Campaign Editor</div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Название</div>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Например: Апрельский follow-up" />
      </div>
      <AudienceSelector value={audience} onChange={setAudience} />
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Сообщение</div>
        <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Текст письма..." />
      </div>
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setSaved(Boolean(title.trim() && message.trim()))}>Сохранить</Button>
        <Button variant="secondary">Сохранить как черновик</Button>
      </div>
    </Card>
  );
}

