"use client";

import { useState } from "react";
import { clients, users } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SuccessMessage } from "@/features/auth/components/success-message";

export function ClientProfilePage() {
  const client = clients.find((c) => c.id === "c1");
  const user = users.find((u) => u.id === client?.userId);
  const [name, setName] = useState(user?.fullName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(client?.contactPhone ?? "");
  const [saved, setSaved] = useState(false);

  if (saved) {
    return <div className="py-8"><SuccessMessage title="Профиль обновлен" description="Изменения сохранены в демо-режиме." /></div>;
  }

  return (
    <div className="space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">My Profile</h1>
      </div>
      <Card className="p-5 space-y-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Имя</div>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Email</div>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">Телефон</div>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <Button onClick={() => setSaved(true)}>Сохранить</Button>
      </Card>
    </div>
  );
}

