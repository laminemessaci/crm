<?php

namespace App\Events;

use App\Entity\Invoice;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class InvoiceSentAtSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setSentAtForInvoice', EventPriorities::PRE_VALIDATE]
        ];
    }

    /**
     * Sets the "sent at" timestamp for an invoice if it meets certain conditions.
     *
     * @param ViewEvent $event The event object.
     * @throws \Exception If an error occurs.
     */
    public function setSentAtForInvoice(ViewEvent $event): void
    {
        try {
            $invoice = $event->getControllerResult();
            $requestMethod = $event->getRequest()->getMethod();
        } catch (\Exception $e) {
            return;
        }

        if ($invoice instanceof Invoice && $requestMethod === "POST" && !$invoice->getSentAt()) {
            $invoice->setSentAt(new \DateTime());
        }
    }
}
