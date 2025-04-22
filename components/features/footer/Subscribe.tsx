"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribe } from "@/services/http/user.http";
import React, { useState } from "react";

function Subscribe({ hasTitle = true }: { hasTitle?: boolean }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [errorMessage, seterrorMessage] = useState(false);

  const subscribeEmail = () => {
    subscribe(email)
      .then(() => {
        setSubscribed(true);
        seterrorMessage(false);
      })
      .catch((err) => {
        console.error(err);
        seterrorMessage(true);
      });
  };

  return (
    <div>
      {hasTitle && (
        <p className="font-bold my-3 mt-5">Subscribe to the newsletter</p>
      )}
      {subscribed ? (
        <div className="text-success">Thank you for Subscription!</div>
      ) : (
        <div className="flex items-center gap-3">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={{
              height: 64,
              borderTopRightRadius: 16,
              borderBottomRightRadius: 16,
              borderTopLeftRadius: 24,
              borderBottomLeftRadius: 24,
            }}
            className="bg-accent w-full"
          />
          <Button
            onClick={subscribeEmail}
            variant={"default"}
            className="bg-primary"
            style={{
              borderTopRightRadius: 24,
              height: 64,
              borderBottomRightRadius: 24,
              borderTopLeftRadius: 16,
              borderBottomLeftRadius: 16,
            }}
          >
            Subscribe
          </Button>
        </div>
      )}
      {errorMessage && <div className="text-error">Something went wrong!</div>}
    </div>
  );
}

export default Subscribe;
