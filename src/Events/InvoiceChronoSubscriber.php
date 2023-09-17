<?php

namespace App\Events;

use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Symfony\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class InvoiceChronoSubscriber implements EventSubscriberInterface
{

    private $security;
    private $repository;

    public function __construct(Security $security, InvoiceRepository $repository)
    {
        $this->security = $security;
        $this->repository = $repository;
    }



    /**
     * Returns an array of events to which the subscribers of this class should be subscribed.
     *
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setChronoForInvoice', EventPriorities::PRE_VALIDATE]
        ];
    }

/**
 * Sets the chrono for an invoice.
 *
 * @param ViewEvent $event The view event.
 * @throws \Exception If an error occurs.
 * @return void
 */
    public function setChronoForInvoice(ViewEvent $event): void
    {
        try {
            $invoice = $event->getControllerResult();
            $requestMethod = $event->getRequest()->getMethod();
        } catch (\Exception $e) {
            return;
        }

        if ($invoice instanceof Invoice && $requestMethod === "POST") {
            $nextChrono = $this->repository->findNextChrono($this->security->getUser());
            $invoice->setChrono($nextChrono);
        }
    }
}
