<?php

namespace App\Entity;

use App\Entity\Customer;
use ApiPlatform\Metadata\Link;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\InvoiceRepository;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: InvoiceRepository::class)]
#[ApiResource(
    order: ['sentAt' => 'DESC'],
    normalizationContext: ['groups' => ['invoices_read']],
)]
#[ApiResource(
    uriTemplate: '/customers/{id}/invoices',
    uriVariables: [
        'id' => new Link(fromClass: Customer::class, fromProperty: 'invoices')
    ],
    normalizationContext: ['groups' => ['invoices_sub_resources']],
    operations: [new GetCollection()]
)]
#[ApiFilter(OrderFilter::class)]
class Invoice
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["invoices_read","customers_read",'invoices_sub_resources'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(["invoices_read","customers_read",'invoices_sub_resources'])]
    private ?float $amount = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(["invoices_read","customers_read",'invoices_sub_resources'])]
    private ?\DateTimeInterface $sentAt = null;

    #[ORM\Column(length: 255)]
    #[Groups(["invoices_read","customers_read",'invoices_sub_resources'])]
    private ?string $status = null;

    #[ORM\Column]
    #[Groups(["invoices_read","customers_read",'invoices_sub_resources'])]
    private ?int $chrono = null;

    #[ORM\ManyToOne(inversedBy: 'invoices')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups("invoices_read")]
    private ?Customer $customer = null;

  

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): static
    {
        $this->amount = $amount;

        return $this;
    }

    public function getSentAt(): ?\DateTimeInterface
    {
        return $this->sentAt;
    }

    public function setSentAt(\DateTimeInterface $sentAt): static
    {
        $this->sentAt = $sentAt;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): static
    {
        $this->customer = $customer;

        return $this;
    }

    public function getChrono(): ?int
    {
        return $this->chrono;
    }

    public function setChrono(int $chrono): static
    {
        $this->chrono = $chrono;

        return $this;
    }

     /**
      * Retrieves the User object.
      *
      * @throws Some_Exception_Class if the User object cannot be retrieved.
      * @return User The User object.
      */
    #[Groups("invoices_read")]
     public function getUser(): User 
    {
        return $this->customer->getUser();
    }

}
