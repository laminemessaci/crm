<?php

namespace App\Entity;

use App\Entity\Customer;
use Symfony\Component\Validator\Constraints as Assert;

use ApiPlatform\Metadata\Link;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\InvoiceRepository;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use Symfony\Component\Serializer\Annotation\Groups;




#[ORM\Entity(repositoryClass: InvoiceRepository::class)]
#[ApiResource(
    order: ['sentAt' => 'DESC'],
    normalizationContext: ['groups' => ['invoices_read']],
    denormalizationContext: ['disable_type_assertion' => true],
    
)]
#[ApiResource(
    uriTemplate: '/customers/{id}/invoices',
    uriVariables: [
        'id' => new Link(fromClass: Customer::class, fromProperty: 'invoices')
    ],
    normalizationContext: ['groups' => ['invoices_sub_resources']],
    denormalizationContext: ['disable_type_enforcement' => true],
    
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

    // TODO: Add Validation, Assert don't work
    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    #[Groups(["invoices_read","customers_read",'invoices_sub_resources'])]
    #[Assert\NotBlank]
    #[Assert\Types(type: 'float', message: 'The amount must be a valid number')]
    private  ?string $amount = null;

    // TODO: Add Validation, Assert don't work
    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(["invoices_read","customers_read",'invoices_sub_resources'])]
    #[Assert\NotBlank]
    #[Assert\Types(type: 'datetime', message: 'The sentAt must be a valid datetime', format: 'YYYY-MM-DD')]
    private ?\DateTimeInterface $sentAt = null;

    #[ORM\Column(length: 255)]
    #[Groups(["invoices_read","customers_read",'invoices_sub_resources'])]
    #[Assert\NotBlank(message: 'Status is required')]
    #[Assert\Choice(choices: ['SENT', 'PAID', 'CANCELLED'], message: 'Status must be SENT, PAID or CANCELLED')]
    private ?string $status = null;

    #[ORM\Column]
    #[Groups(["invoices_read","customers_read",'invoices_sub_resources'])]
    #[Assert\NotBlank(message: 'Chrono is required')]
    #[Assert\Positive]
    #[Assert\Types(type: 'integer', message: 'The chrono must be a valid number')]
    private ?int $chrono = null;

    #[ORM\ManyToOne(inversedBy: 'invoices')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups("invoices_read")]
    #[Assert\NotBlank(message: 'Customer is required')]
    private ?Customer $customer = null;

  

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount( $amount): static
    {
       
        $this->amount =(float) $amount;

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
