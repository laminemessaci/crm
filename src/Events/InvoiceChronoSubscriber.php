<?php

namespace App\Events;

use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Symfony\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class InvoiceChronoSubscriber implements EventSubscriberInterface
{

    private $tokenStorage;
    private $repository;

    /**
     * Create a new instance of the class.
     *
     * @param TokenStorageInterface $tokenStorage The token storage interface.
     * @param InvoiceRepository $repository The invoice repository.
     */
    public function __construct(TokenStorageInterface $tokenStorage, InvoiceRepository $repository)
    {
        $this->tokenStorage = $tokenStorage;
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
            //dd($invoice);
            $requestMethod = $event->getRequest()->getMethod();
        } catch (\Exception $e) {
            return;
        }

        if ($invoice instanceof Invoice && ($requestMethod === "PUT" || $requestMethod === "POST")) {
            $nextChrono = $this->repository->findNextChrono($this->tokenStorage->getToken()->getUser());
            $invoice->setChrono($nextChrono);
        }
    }
}
