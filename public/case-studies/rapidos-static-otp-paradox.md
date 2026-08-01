# Why Does Rapido Use the Same OTP?

## A Product Teardown of Engineering Trade-offs Behind Ride Verification

> **Disclaimer:** This case study is based on publicly observable product behaviour and informed product reasoning. Rapido has not publicly documented the internal implementation of its ride verification system. Any discussion of backend design is presented as hypothesis, not fact.

---

# Executive Summary

Most ride-hailing platforms generate a fresh OTP for every trip. Rapido does not. Frequent users quickly notice that their 4-digit Rapid PIN remains the same across rides.

At first glance this appears to be a security compromise. Viewed through a product lens, however, it represents a deliberate trade-off between security, rider friction, operational complexity, and pickup speed.

This case study examines:

- Why ride verification exists.
- Why Rapido's design differs from Ola and Uber.
- The engineering and business trade-offs behind both approaches.
- When static verification begins to break down.
- How I would evolve the system as the product scales.

---

# Product Context

A ride verification mechanism has one primary objective:

> Ensure the right passenger starts the right ride with the right captain.

Unlike banking authentication, ride verification happens in a physical environment where GPS, vehicle details, captain identity and rider presence collectively reduce risk.

This changes the threat model entirely.

---

# The Observation

Over multiple Rapido bookings I observed that my Rapid PIN remained unchanged.

The same behaviour was not present on Ola or Uber, both of which issue a new OTP for every booking.

Rather than assuming this was a bug, I treated it as a product decision and asked a different question:

> What problem is Rapido actually optimizing for?

---

# Success Metrics

A PM evaluating ride verification should measure:

- Ride start latency
- Pickup completion rate
- Captain wait time
- Wrong ride starts
- OTP verification failures
- SMS delivery failures
- Customer support tickets
- Fraud incidents

Security is only one metric among many.

---

# Side-by-Side Walkthrough

## Slice 1 — Ride Verification

### Rapido

**Current State**

Uses a reusable Rapid PIN associated with the rider account.

**Advantages**

- Instant verification
- No SMS dependency
- Lower operational friction

**Limitations**

- Lower entropy than single-use OTPs
- PIN remains valid across rides

**Verdict**

Optimized for speed.

---

### Ola & Uber

**Current State**

Generate a new OTP for every ride.

**Advantages**

- Session isolation
- Strong auditability
- Reduced replay risk

**Limitations**

- Requires OTP generation and delivery
- Adds pickup friction

**Verdict**

Optimized for stronger ride-level verification.

---

## Slice 2 — Pickup Experience

Rapido minimizes interaction at the kerb. Riders can begin verification immediately, even if SMS delivery is delayed.

Ola and Uber introduce an additional verification step that slightly increases pickup time while improving assurance.

**Verdict**

Rapido wins on pickup speed.

---

## Slice 3 — Infrastructure

Dynamic OTP systems require generation, storage, expiry handling, replay protection and reliable message delivery.

A reusable rider PIN can reduce this operational complexity, although Rapido's implementation details are not public.

**Verdict**

Static verification is operationally simpler.

---

## Slice 4 — Threat Model

The relevant threats are:

- Wrong rider pickup
- Driver accidentally starting another booking
- Basic impersonation

These differ significantly from banking or account authentication.

The physical context provides additional safeguards beyond the four digits themselves.

**Verdict**

The chosen verification strength should match the threat being addressed.

---

## Slice 5 — Scalability

As products expand into premium rides, enterprise accounts, airports and longer trips, stronger ride-level verification becomes increasingly valuable.

Static verification works well under one operating model but may become insufficient under another.

**Verdict**

Product maturity should determine verification complexity.

---

# Engineering Trade-offs

| Decision               | Benefit                      | Cost                  |
| ---------------------- | ---------------------------- | --------------------- |
| Static PIN             | Faster pickup                | Lower security margin |
| Dynamic OTP            | Better security              | More friction         |
| SMS-based verification | Stronger session isolation   | Delivery dependency   |
| Reusable PIN           | Lower operational complexity | Persistent credential |

---

# Alternative Designs

## Option 1 — Static PIN

Best for:

- Short urban rides
- High ride frequency
- Low pickup friction

## Option 2 — Dynamic OTP

Best for:

- Premium rides
- High-value bookings
- Enterprise customers

## Option 3 — Adaptive Verification (Recommended)

Generate a dynamic OTP only when risk increases.

Examples:

- Airport pickup
- Late-night rides
- Suspicious location mismatch
- Premium category
- Corporate travel
- Fraud risk detected

This preserves Rapido's fast experience while strengthening security only where necessary.

---

# If I Were the Product Manager

## Phase 1

Measure:

- Wrong ride starts
- Pickup latency
- OTP failures

## Phase 2

Introduce adaptive verification behind feature flags.

## Phase 3

Deploy a lightweight risk engine.

## Phase 4

Expand dynamic verification only where justified by measurable risk.

---

# Decision Matrix

| Criteria         | Static PIN | Dynamic OTP |   Adaptive |
| ---------------- | ---------: | ----------: | ---------: |
| Pickup Speed     | ⭐⭐⭐⭐⭐ |      ⭐⭐⭐ |   ⭐⭐⭐⭐ |
| Security         |     ⭐⭐⭐ |  ⭐⭐⭐⭐⭐ |   ⭐⭐⭐⭐ |
| Operational Cost | ⭐⭐⭐⭐⭐ |        ⭐⭐ |   ⭐⭐⭐⭐ |
| User Friction    | ⭐⭐⭐⭐⭐ |      ⭐⭐⭐ |   ⭐⭐⭐⭐ |
| Scalability      |     ⭐⭐⭐ |  ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

# Product Lessons

- Security controls should match the threat model.
- Great product decisions optimize for outcomes, not conventions.
- Lower friction can create more value than stronger authentication.
- Architecture should evolve alongside business maturity.
- Every engineering decision is ultimately a product decision.

---

# Closing Argument

Rapido's reusable Rapid PIN should not automatically be viewed as a security flaw. Based on observable behaviour, it appears to prioritize fast ride initiation, reduced operational complexity and lower pickup friction.

The more interesting product question is not whether dynamic OTPs are objectively better, but **when** the additional security they provide begins to outweigh the costs they introduce.

Until that point, a reusable PIN can be a rational design choice that aligns with the product Rapido is building.
